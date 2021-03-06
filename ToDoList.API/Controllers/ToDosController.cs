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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(string userName, int id)
        {
            if(userName != (User.FindFirst(ClaimTypes.Name).Value))
                    return Unauthorized();

            if(userName != null)
            {
            var task = await toDoRepository.getToDo(userName, id);
            if(task != null) 
            {
                var taskForReturn = mapper.Map<TaskForReturnDto>(task);
                return Ok(taskForReturn);
            }

                return NotFound();
            }
            
            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(string userName, int id, TaskForUpdateDto taskForUpdate)
        {
            if(userName != (User.FindFirst(ClaimTypes.Name).Value))
                    return Unauthorized();

                var task = await toDoRepository.getToDo(userName, id);
                if(task != null)
                {
                    mapper.Map(taskForUpdate, task);

                    if(await toDoRepository.SaveAll()) return Ok("Succesfuly updated");

                    return BadRequest("Dupa");
                    
                }    

                return NotFound();
        }

        [HttpPut]
        [Route("{taskId}/status")]
        public async Task<IActionResult> ChangeStatus(string userName, int taskId)
        {
            if(userName != (User.FindFirst(ClaimTypes.Name).Value))
                    return Unauthorized();

            var task = await toDoRepository.getToDo(userName, taskId);
            if(task != null)
            {
                if(task.IsDone) return BadRequest("This task is already done");

                task.IsDone = true;

                if(await toDoRepository.SaveAll()) return Ok("Changed status");
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(string userName, int id)
        {
            if(userName != (User.FindFirst(ClaimTypes.Name).Value))
                    return Unauthorized();
                    
            var task = await toDoRepository.getToDo(userName, id);
            if(task != null)
            {
                toDoRepository.Delete(task);
                if(await toDoRepository.SaveAll()) return Ok("Deleted");

                return BadRequest();
            }

            return NotFound();
        }

    }
}