using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.API.Data;
using ToDoList.API.Dtos;
using ToDoList.API.Helpers;
using ToDoList.API.Models;

namespace ToDoList.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/{userName}/[controller]")]
    public class ToDosController : ControllerBase
    {
        private readonly IToDoRepository toDoRepository;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public ToDosController(IToDoRepository toDoRepository, UserManager<ApplicationUser> userManager, IMapper mapper, DataContext dataContext)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
            this.toDoRepository = toDoRepository;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(string userName, TaskForCreationDto taskForCreation)
        {
            if(userName != (User.FindFirst(ClaimTypes.Name).Value))
                    return Unauthorized();

            if (ModelState.IsValid)
            {
                var user = await userManager.Users.Include(u => u.ToDos).FirstOrDefaultAsync(u => u.UserName == userName);

                if (user != null)
                {
                    var toDo = mapper.Map<ToDo>(taskForCreation);


                    user.ToDos.Add(toDo);

                    if (await toDoRepository.SaveAll())
                    {
                        return StatusCode(201);
                    }

                    return BadRequest();
                }

                return Unauthorized();
            }

            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks(string userName, [FromQuery] TaskParams taskParams)
        {
            if(userName != (User.FindFirst(ClaimTypes.Name).Value))
                    return Unauthorized();
     
            var tasks = await toDoRepository.getToDos(userName, taskParams);
            if(tasks != null)
            {
                var tasksToReturn = mapper.Map<IEnumerable<TaskForReturnDto>>(tasks);

                return Ok(tasksToReturn);
            }
           
            return BadRequest();
        }

    }
}