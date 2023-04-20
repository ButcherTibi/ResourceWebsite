using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System.IO;
using System.Net;
using System.Net.Http.Headers;

[ApiController]
[Route("api")]
public class Endpoints : ControllerBase
{
	public class GetImageFileRequest
	{
		public int id { get; set; }
	};

	[HttpPost("getImageFile")]
	public ActionResult getImageFile(GetImageFileRequest req)
	{
		string filepath = "Resources/test_image.png";
		return new FileStreamResult(new FileStream(filepath, FileMode.Open, FileAccess.Read, FileShare.Read), "image/png");
	}

	public class GetImageDetailsResponse
	{
		// Resource Static Details
        public string title { get; set; }
		public DateTime create_date { get; set; }
		public string description { get; set; }
		public List<string> keywords { get; set; }

		// Resource Dynamic Details
		public int views { get; set; }
		public int likes { get; set; }
		public int dislikes { get; set; }

		// Author Details
        public string author_name { get; set; }
		public int subscriptions { get; set; }
    }

	[HttpPost("getImageDetails")]
	public GetImageDetailsResponse getImageDetails(GetImageFileRequest req)
	{
		return new GetImageDetailsResponse {
			title = "Image Title",
			create_date = DateTime.Now,
			description = "Image Description",
			keywords = new List<string> { "keyword 0", "keyword 1", "keyword 2" },

			views = 120_000,
			likes = 12_000,
			dislikes = 203,

			author_name = "Author name",
			subscriptions = 20781
		};
	}

	public class GetCommentsRequest
	{
		public int resource_id { get; set; }
	}

	public class GetCommentsResponse
	{
		public class Comment
		{
			public int level { get; set; }
			public string user_name { get; set; }
			public string text { get; set; }
		}

		public List<Comment> comments { get; set; }
	}

	[HttpPost("getResourceComments")]
	public GetCommentsResponse getResourceComments(GetCommentsRequest req)
	{
		var result = new GetCommentsResponse {
			comments = new List<GetCommentsResponse.Comment>()
		};

		result.comments.Add(new GetCommentsResponse.Comment {
			level = 0,
			user_name = "User 0",
			text = "Comment 0"
		});
		result.comments.Add(new GetCommentsResponse.Comment {
			level = 1,
			user_name = "User 1",
			text = "Comment 1"
		});
		result.comments.Add(new GetCommentsResponse.Comment {
			level = 1,
			user_name = "User 2",
			text = "Comment 2"
		});

		return result;
	}
};