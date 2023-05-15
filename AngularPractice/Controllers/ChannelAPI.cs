using db;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;


public partial class Endpoints
{
	public class GetChannelDetailsRequest
	{
		public int user_id { get; set; }
	}

	public class GetChannelDetailsResponse
	{
		public string owner_name { get; set; }
		public string description { get; set; }

		public class ResourcePreview
		{
			public int resource_id { get; set; }
			public string title { get; set; }
			public int views { get; set; }
			public DateTime update_date { get; set; }
		}

		public ICollection<ResourcePreview> resources { get; set; }
	}

	public partial ActionResult getChannelDetails(GetChannelDetailsRequest req)
	{
		var found_user = ctx.users.Where(user =>
			user.id == req.user_id
		).Include(user => user.image_resources)
		.FirstOrDefault();

		if (found_user == null) {
			return NotFound($"User with id = {req.user_id} was not found");
		}

		var resources = found_user.image_resources.Select(img_res => {
			return new GetChannelDetailsResponse.ResourcePreview {
				resource_id = img_res.id,
				title = img_res.title,
				views = img_res.views,
				update_date = img_res.update_date ?? img_res.create_date
			};
		}).ToList();

		return Ok(new GetChannelDetailsResponse {
			owner_name = found_user.name,
			description = found_user.channel_description,
			resources = resources
		});
	}

	public class GetChannelBannerRequest
	{
		 public int user_id { get; set; }
	}

	public partial ActionResult getChannelBanner(GetChannelBannerRequest req)
	{
		var user = ctx.users.Where(usr =>
			usr.id == req.user_id
		).FirstOrDefault();

		if (user == null) {
			return NotFound($"User with id = {req.user_id} was not found");
		}

		FileStream file_stream;
		try {
			file_stream = System.IO.File.Open(user.channel_banner_filepath, FileMode.Open, FileAccess.Read, FileShare.Read);
		}
		catch (Exception) {
			return NotFound("Could not find file on disk");
		}

		string media_type = "";
		switch (user.channel_banner_extension) {
		case "png": {
			media_type = "image/png";
			break;
		}
		default: {
			return StatusCode(500, "Unrecognized media type");
		}
		}

		return new FileStreamResult(file_stream, media_type);
	}

	public partial ActionResult updateChannel(IFormCollection form)
	{
		int user_id;
		if (Security.readTokenUserId(Request, out user_id) != "") {
			return Unauthorized("Token read error");
		}

		var user = ctx.users.Find(user_id);
		if (user == null) {
			return Unauthorized("Token user not found");
		}



		return Ok();
	}

	public partial ActionResult upsertResource(IFormCollection form)
	{
		var resource_id_str = form["resource_id"].FirstOrDefault() ?? "";
		var title = form["title"].FirstOrDefault();
		var description = form["description"].FirstOrDefault();
		var resource_file = form.Files["resource_file"];
		var preview_file = form.Files["preview_file"];

		int resource_id;
		ImageResource? resource;

		// Validate token
		int user_id;
		if (Security.readTokenUserId(Request, out user_id) != "") {
			return Unauthorized("Token read error");
		}

		var user = ctx.users.Find(user_id);
		if (user == null) {
			return Unauthorized("Token user not found");
		}

		// Create new resource
		if (resource_id_str == "") {

			resource = new db.ImageResource {
				parent_user = user,
				title = title,
				description = description,
				keywords = "",
				image_filepath = "",
				preview_filepath = "",
				create_date = DateTime.Now,
			};
			ctx.image_resources.Add(resource);
			ctx.SaveChanges();

			resource_id = resource.id;
		}
		// Update existing resource
		else {
			resource_id = int.Parse(resource_id_str);

			resource = ctx.image_resources.Where(res =>
				res.id == resource_id
			).Include(res => res.parent_user)
			.FirstOrDefault();

			if (resource == null) {
				return NotFound($"Could not find resource = {resource_id} to update");
			}

			resource.title = title;
			resource.description = description;
			resource.update_date = DateTime.Now;

			ctx.SaveChanges();
		}

		// Resource File
		if (resource_file != null) {

			resource.image_filepath = $"{Constants.file_storage_path}\\{resource.id}";
			var read_stream = resource_file.OpenReadStream();
			var write_stream = System.IO.File.Create(resource.image_filepath);

			using (write_stream) {
				read_stream.Seek(0, SeekOrigin.Begin);
				read_stream.CopyTo(write_stream);
			}

			ctx.SaveChanges();
		}

		// Preview File
		if (preview_file != null) {

			resource.preview_filepath = $"{Constants.preview_storage_path}\\{resource.id}";
			var read_stream = preview_file.OpenReadStream();
			var write_stream = System.IO.File.Create(resource.preview_filepath);

			using (write_stream) {
				read_stream.Seek(0, SeekOrigin.Begin);
				read_stream.CopyTo(write_stream);
			}

			ctx.SaveChanges();
		}

		return Ok(new {
			resource_id = resource_id
		});
	}
}
