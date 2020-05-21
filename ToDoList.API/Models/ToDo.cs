using System;

namespace ToDoList.API.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime DeathLine { get; set; }
        public ApplicationUser User { get; set; }
        public string UserId { get; set; }
    }
}