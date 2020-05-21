using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ToDoList.API.Models;

namespace ToDoList.API.Data
{
    public class DataContext: IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions o) :base(o)
        {
        }

        public DbSet<ToDo> ToDos { get; set; }
    }
}