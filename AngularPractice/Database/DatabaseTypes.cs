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
		
	}

	public enum ResourceType
	{
		Image,
		Audio
	}

	public class User : DbType
	{
		public int id { get; set; }

		// Credentials
		public string name { get; set; }
		public string password { get; set; }

		// Created Content
		public virtual ICollection<ImageResource> image_resources { get; set; }
		public virtual ICollection<AudioResource> audio_resources { get; set; }

		// Time
		public DateTime create_date { get; set; }
		public DateTime? update_date { get; set; }
		public DateTime? delete_date { get; set; }
	}

	public class ImageResource : DbType
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

	public class AudioResource : DbType
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

	public class Blog
	{
		public int BlogId { get; set; }
		public string Url { get; set; }

		public virtual List<Post> Posts { get; } = new();
	}

	public class Post
	{
		public int PostId { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }

		public int BlogId { get; set; }
		public virtual Blog Blog { get; set; }
	}

	public class DatabaseContext : DbContext
	{
		public DbSet<Blog> Blogs { get; set; }
		public DbSet<Post> Posts { get; set; }

		public DbSet<User> users { get; set; }
		public DbSet<ImageResource> image_resources { get; set; }
		public DbSet<AudioResource> audio_resources { get; set; }
		public DbSet<Comment> resource_comments { get; set; }


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
