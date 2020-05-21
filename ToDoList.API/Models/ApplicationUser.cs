using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ToDoList.API.Models
{
    public class ApplicationUser: IdentityUser
    {
        public ICollection<ToDo> ToDos { get; set; }
    }
}