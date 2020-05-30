using System;

namespace ToDoList.API.Dtos
{
    public class TaskForReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime DeathLine { get; set; }
        public bool IsDone { get; set; }
    }
}