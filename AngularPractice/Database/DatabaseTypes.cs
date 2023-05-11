using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace db
{
	public interface DbType
	{
		public int id { get; set; }

		public DateTime create_date { get; set; }
		public DateTime? update_date { get; set; }
		public DateTime? delete_date { get; set; }
	}

	public interface Resource
	{
		public string preview_filepath { get; set; }
	}

	public enum ResourceType
	{
		Image = 0,
		Audio = 1
	}

	public class User : DbType
	{
		public int id { get; set; }

		// Credentials
		public string name { get; set; }
		public string password { get; set; }

		// User
		public string avatar_img_filepath { get; set; }

		// Channel
		public string channel_banner_filepath { get; set; }
		public string channel_banner_extension { get; set; }
		public string channel_description { get; set; }
		public virtual ICollection<ImageResource> image_resources { get; set; }
		public virtual ICollection<AudioResource> audio_resources { get; set; }

		// Time
		public DateTime create_date { get; set; }
		public DateTime? update_date { get; set; }
		public DateTime? delete_date { get; set; }
	}

	public class ImageResource : DbType, Resource
	{
		public int id { get; set; }

		public virtual User parent_user { get; set; }

		// Resource Static Details
		public string title { get; set; }
		public string description { get; set; }
		public string keywords { get; set; }

		// Resource Dynamic Details
		public int views { get; set; }
		public int likes { get; set; }
		public int dislikes { get; set; }

		// File
		public string image_filepath { get; set; }
		public string preview_filepath { get; set; }

		// Time
		public DateTime create_date { get; set; }
		public DateTime? update_date { get; set; }
		public DateTime? delete_date { get; set; }
	}

	public class AudioResource : DbType, Resource
	{
		public int id { get; set; }

		public virtual User parent_user { get; set; }

		// Resource Static Details
		public string title { get; set; }
		public string description { get; set; }
		public string keywords { get; set; }

		// Resource Dynamic Details
		public int views { get; set; }
		public int likes { get; set; }
		public int dislikes { get; set; }

		// File
		public string audio_filepath { get; set; }
		public string preview_filepath { get; set; }

		public DateTime create_date { get; set; }
		public DateTime? update_date { get; set; }
		public DateTime? delete_date { get; set; }
	}

	public class Comment : DbType
	{
		public int id { get; set; }

		// Where to look for parent resouce
		public int resource_id { get; set; }
		public ResourceType resource_type { get; set; }

		public int parent_comment_id { get; set; }
		public int author_id { get; set; }
		public string text { get; set; }

		public DateTime create_date { get; set; }
		public DateTime? update_date { get; set; }
		public DateTime? delete_date { get; set; }
	}

	public class Rating
	{
		public ResourceType resource_type { get; set; }
		public int resource_id { get; set; }
		public int user_id { get; set; }

		public int rating { get; set; }

		public DateTime create_date { get; set; }
	}

	public class DatabaseContext : DbContext
	{
		public DbSet<User> users { get; set; }

		public DbSet<ImageResource> image_resources { get; set; }
		public DbSet<AudioResource> audio_resources { get; set; }
		public DbSet<Comment> resource_comments { get; set; }
		// public DbSet<Rating> resource_ratings { get; set; }


		static DbContextOptions setOptions(DbContextOptionsBuilder options)
		{
			options.UseLazyLoadingProxies();

			var conn_str = new SqlConnectionStringBuilder();
			conn_str.DataSource = $"{Environment.MachineName}\\SQLEXPRESS";
			conn_str.InitialCatalog = "Main";
			conn_str.IntegratedSecurity = true;
			conn_str.Encrypt = false;

			options.UseSqlServer(conn_str.ToString());

			return options.Options;
		}

		public DatabaseContext() : base(setOptions(new DbContextOptionsBuilder()))
		{

		}

		protected override void OnConfiguring(DbContextOptionsBuilder options)
		{
			setOptions(options);
		}
	}
}
