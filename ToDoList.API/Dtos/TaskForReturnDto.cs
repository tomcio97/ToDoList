using System;

namespace ToDoList.API.Dtos
{
    public class TaskForReturnDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime DeathLine { get; set; }
    }
}