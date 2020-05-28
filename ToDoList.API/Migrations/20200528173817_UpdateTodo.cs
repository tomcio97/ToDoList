using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDoList.API.Migrations
{
    public partial class UpdateTodo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDone",
                table: "ToDos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDone",
                table: "ToDos");
        }
    }
}
