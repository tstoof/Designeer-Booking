using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBS.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddIsBookedToAvailability : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsBooked",
                table: "Availabilities",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsBooked",
                table: "Availabilities");
        }
    }
}
