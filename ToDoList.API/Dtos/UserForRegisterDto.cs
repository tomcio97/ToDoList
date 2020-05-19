using System.ComponentModel.DataAnnotations;

namespace ToDoList.API.Dtos
{
    public class UserForRegisterDto
    {
        [MinLength(4)]
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}