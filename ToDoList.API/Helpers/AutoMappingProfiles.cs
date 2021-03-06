using AutoMapper;
using ToDoList.API.Dtos;
using ToDoList.API.Models;

namespace ToDoList.API.Helpers
{
    public class AutoMappingProfiles: Profile
    {
        public AutoMappingProfiles()
        {
            CreateMap<UserForRegisterDto, ApplicationUser>();
            CreateMap<TaskForCreationDto, ToDo>();
            CreateMap<ToDo, TaskForReturnDto>();
            CreateMap<TaskForUpdateDto, ToDo>();
        }
    }
}