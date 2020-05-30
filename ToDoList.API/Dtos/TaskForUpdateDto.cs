using System;
using System.ComponentModel.DataAnnotations;

namespace ToDoList.API.Dtos
{
    public class TaskForUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DeathLine { get; set; }      
    }
}