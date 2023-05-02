using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularPractice.Migrations
{
    /// <inheritdoc />
    public partial class Added_User_And_Resource_Types : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    create_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    update_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    delete_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "audio_resources",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    parent_userid = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    keywords = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    views = table.Column<int>(type: "int", nullable: false),
                    likes = table.Column<int>(type: "int", nullable: false),
                    dislikes = table.Column<int>(type: "int", nullable: false),
                    audio_filepath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    preview_filepath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    create_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    update_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    delete_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_audio_resources", x => x.id);
                    table.ForeignKey(
                        name: "FK_audio_resources_users_parent_userid",
                        column: x => x.parent_userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "image_resources",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    parent_userid = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    keywords = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    views = table.Column<int>(type: "int", nullable: false),
                    likes = table.Column<int>(type: "int", nullable: false),
                    dislikes = table.Column<int>(type: "int", nullable: false),
                    image_filepath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    preview_filepath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    create_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    update_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    delete_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_image_resources", x => x.id);
                    table.ForeignKey(
                        name: "FK_image_resources_users_parent_userid",
                        column: x => x.parent_userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_audio_resources_parent_userid",
                table: "audio_resources",
                column: "parent_userid");

            migrationBuilder.CreateIndex(
                name: "IX_image_resources_parent_userid",
                table: "image_resources",
                column: "parent_userid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "audio_resources");

            migrationBuilder.DropTable(
                name: "image_resources");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
