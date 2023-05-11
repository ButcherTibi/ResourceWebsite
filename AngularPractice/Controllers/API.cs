using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Net;
using System.Net.Http.Headers;



[ApiController]
[Route("api")]
public partial class Endpoints : ControllerBase
{
	private readonly db.DatabaseContext ctx;

	public Endpoints(db.DatabaseContext new_ctx)
	{
		ctx = new_ctx;
	}


	// Channel API

	[HttpPost("getChannelDetails")]
	[AllowAnonymous]
	public partial ActionResult getChannelDetails(GetChannelDetailsRequest req);

	[HttpPost("getChannelBannerImage")]
	[AllowAnonymous]
	public partial ActionResult getChannelBannerImage(GetChannelBannerImageRequest req);

	[HttpPost("upsertResourceFile")]
	[Authorize]
	public partial ActionResult upsertResource(IFormCollection form);



	public class GetImageFileRequest
	{
		public int resource_id { get; set; }
	};

	[HttpPost("getImageFile")]
	public ActionResult getImageFile(GetImageFileRequest req)
	{
		var image_resource = ctx.image_resources.Find(req.resource_id);

		if (image_resource == null) {
			return NotFound($"Image resource with id = {req.resource_id} was not found");
		}

		return new FileStreamResult(new FileStream(image_resource.image_filepath, FileMode.Open, FileAccess.Read, FileShare.Read), "image/png");
	}

	public class GetImageDetailsResponse
	{
		public int resource_id { get; set; }

		// Resource Static Details
        public string title { get; set; }
		public DateTime create_date { get; set; }
		public string description { get; set; }
		public string[] keywords { get; set; }

		// Resource Dynamic Details
		public int views { get; set; }
		public int likes { get; set; }
		public int dislikes { get; set; }

		// Author Details
		public int author_id { get; set; }
        public string author_name { get; set; }
		public int subscriptions { get; set; }
    }

	[HttpPost("getImageDetails")]
	public ActionResult getImageDetails(GetImageFileRequest req)
	{
		var img_res = ctx.image_resources.Where(img =>
			img.id == req.resource_id
		).Include(img => img.parent_user)
		.FirstOrDefault();

		if (img_res == null) {
			return NotFound($"Image resource with id = {req.resource_id} was not found");
		}

		return Ok(new GetImageDetailsResponse {
			resource_id = img_res.id,

			title = img_res.title,
			create_date = img_res.create_date,
			description = img_res.description,
			keywords = img_res.keywords.Split(','),

			views = img_res.views,
			likes = img_res.likes,
			dislikes = img_res.dislikes,

			author_id = img_res.parent_user.id,
			author_name = img_res.parent_user.name,
			subscriptions = 0
		});
	}

	public class GetCommentsRequest
	{
		public int resource_id { get; set; }
		public db.ResourceType resource_type { get; set; }
		public int parent_comment_id { get; set; }
	}

	public class GetCommentsResponse
	{
		public class Comment
		{
			public int id { get; set; }
			public int parent_comment_id { get; set; }

			public int author_id { get; set; }
			public string author_name { get; set; }
			public DateTime update_date { get; set; }
			public string text { get; set; }
			public int likes { get; set; }
			public int dislikes { get; set; }
		}

		public List<Comment> comments { get; set; }
	}

	[HttpPost("getResourceComments")]
	public GetCommentsResponse getResourceComments(GetCommentsRequest req)
	{
		var result = new GetCommentsResponse {
			comments = new List<GetCommentsResponse.Comment>()
		};

		result.comments = ctx.resource_comments.Where(c =>
			c.resource_type == req.resource_type &&
			c.resource_id == req.resource_id
		).Join(
			ctx.users,
			comment => comment.author_id,
			user => user.id,
			(comment, user) => new GetCommentsResponse.Comment {
				id = comment.id,
				parent_comment_id = comment.parent_comment_id,
				author_id = user.id,
				author_name = user.name,

				update_date = comment.update_date ?? comment.create_date,
				likes = 0,
				dislikes = 0,

				text = comment.text,
			}
		).ToList();

		return result;
	}

	public class AddCommentRequest
	{
		// Where
		public int resource_id { get; set; }
		public int author_id { get; set; }
		public int parent_comment_id { get; set; }

		// What
		public string comment_text { get; set; }
	}

	[HttpPost("addComment")]
	[Authorize]
	public ActionResult addComment(AddCommentRequest req)
	{
		return Ok();
	}


	public class GetResourceRecomendationsRequest
	{
		public int resource_id { get; set; }
	}

	public class GetResourceRecomendationsResponse
	{
		public class Recomendation
		{
			public int resource_id { get; set; }
			public string title { get; set; }
			public string author { get; set; }
			public int views { get; set; }
			public DateTime create_date { get; set; }
		}

		public List<Recomendation> recomendations { get; set; }
	}

	[HttpPost("getResourceRecomendations")]
	public GetResourceRecomendationsResponse getResourceRecomendations(GetResourceRecomendationsRequest req)
	{
		var result = new GetResourceRecomendationsResponse {
			recomendations = new List<GetResourceRecomendationsResponse.Recomendation>()
		};

		for (var i = 0; i < 13; i++) {
			result.recomendations.Add(new GetResourceRecomendationsResponse.Recomendation {
				resource_id = 1,
				title = $"Recomendation {i}",
				author = $"Author {i}",
				views = new Random().Next(13_891_463),
				create_date = DateTime.Now,
			});
		}

		return result;
	}

	public class GetPreviewImageRequest
	{
		public int resource_id { get; set; }
		public db.ResourceType type { get; set; }
	}

	[HttpPost("getPreviewImage")]
	public ActionResult getPreviewImage(GetPreviewImageRequest req)
	{
		db.Resource? resource;

		switch (req.type) {
		case db.ResourceType.Image: {
			resource = ctx.image_resources.Find(req.resource_id);
			break;
		}
		default: {
			return BadRequest($"Unrecognized resource type = {req.type}");
		}
		}

		if (resource == null) {
			return NotFound($"Resource of type = {req.type} with id = {req.resource_id} was not found");
		}

		return new FileStreamResult(new FileStream(resource.preview_filepath, FileMode.Open, FileAccess.Read, FileShare.Read), "image/png");
	}
};