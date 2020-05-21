using System;
using System.ComponentModel.DataAnnotations;

namespace ToDoList.API.Dtos
{
    public class TaskForCreationDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime DeathLine { get; set; }

        public TaskForCreationDto()
        {
            CreateDate = DateTime.Now;
        }
    }
}