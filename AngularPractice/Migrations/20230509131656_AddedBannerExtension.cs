using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularPractice.Migrations
{
    /// <inheritdoc />
    public partial class AddedBannerExtension : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "channel_banner_extension",
                table: "users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "channel_banner_extension",
                table: "users");
        }
    }
}
