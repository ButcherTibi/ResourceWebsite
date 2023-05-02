﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using db;

#nullable disable

namespace AngularPractice.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20230427112028_Added_User_And_Resource_Types")]
    partial class Added_User_And_Resource_Types
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("db.AudioResource", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("audio_filepath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("create_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("delete_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("dislikes")
                        .HasColumnType("int");

                    b.Property<string>("keywords")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("likes")
                        .HasColumnType("int");

                    b.Property<int>("parent_userid")
                        .HasColumnType("int");

                    b.Property<string>("preview_filepath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("update_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("views")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("parent_userid");

                    b.ToTable("audio_resources");
                });

            modelBuilder.Entity("db.Blog", b =>
                {
                    b.Property<int>("BlogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BlogId"));

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BlogId");

                    b.ToTable("Blogs");
                });

            modelBuilder.Entity("db.ImageResource", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<DateTime>("create_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("delete_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("dislikes")
                        .HasColumnType("int");

                    b.Property<string>("image_filepath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("keywords")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("likes")
                        .HasColumnType("int");

                    b.Property<int>("parent_userid")
                        .HasColumnType("int");

                    b.Property<string>("preview_filepath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("update_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("views")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("parent_userid");

                    b.ToTable("image_resources");
                });

            modelBuilder.Entity("db.Post", b =>
                {
                    b.Property<int>("PostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PostId"));

                    b.Property<int>("BlogId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PostId");

                    b.HasIndex("BlogId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("db.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<DateTime>("create_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("delete_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("update_date")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("db.AudioResource", b =>
                {
                    b.HasOne("db.User", "parent_user")
                        .WithMany("audio_resources")
                        .HasForeignKey("parent_userid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("parent_user");
                });

            modelBuilder.Entity("db.ImageResource", b =>
                {
                    b.HasOne("db.User", "parent_user")
                        .WithMany("image_resources")
                        .HasForeignKey("parent_userid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("parent_user");
                });

            modelBuilder.Entity("db.Post", b =>
                {
                    b.HasOne("db.Blog", "Blog")
                        .WithMany("Posts")
                        .HasForeignKey("BlogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Blog");
                });

            modelBuilder.Entity("db.Blog", b =>
                {
                    b.Navigation("Posts");
                });

            modelBuilder.Entity("db.User", b =>
                {
                    b.Navigation("audio_resources");

                    b.Navigation("image_resources");
                });
#pragma warning restore 612, 618
        }
    }
}
