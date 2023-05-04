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
			public DateTime create_date { get; set; }
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
				create_date = img_res.create_date
			};
		}).ToList();

		return Ok(new GetChannelDetailsResponse {
			owner_name = found_user.name,
			description = found_user.channel_description,
			resources = resources
		});
	}


}
