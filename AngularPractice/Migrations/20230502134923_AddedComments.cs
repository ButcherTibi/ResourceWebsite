using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularPractice.Migrations
{
    /// <inheritdoc />
    public partial class AddedComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "resource_comments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    resource_id = table.Column<int>(type: "int", nullable: false),
                    resource_type = table.Column<int>(type: "int", nullable: false),
                    parent_comment_id = table.Column<int>(type: "int", nullable: false),
                    author_id = table.Column<int>(type: "int", nullable: false),
                    text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    create_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    update_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    delete_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_resource_comments", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "resource_comments");
        }
    }
}
