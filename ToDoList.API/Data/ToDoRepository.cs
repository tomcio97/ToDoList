using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToDoList.API.Helpers;
using ToDoList.API.Models;

namespace ToDoList.API.Data
{
    public class ToDoRepository : GenericRepository, IToDoRepository
    {
        private readonly DataContext dataContext;
        private readonly UserManager<ApplicationUser> userManager;
        public ToDoRepository(DataContext dataContext, UserManager<ApplicationUser> userManager) : base(dataContext)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;
        }

        public async Task<ToDo> getToDo(string userName, int toDoId)
        {
            var toDo = await dataContext.ToDos.Where(t => t.User.UserName == userName).FirstOrDefaultAsync(t => t.Id == toDoId);
            return toDo;
        }

        public async Task<IEnumerable<ToDo>> getToDos(string userName, TaskParams taskParams)
        {
            var toDos = dataContext.ToDos.Where(t => t.User.UserName == userName).AsQueryable();
            if(taskParams.Status != null)
            {
                if(taskParams.Status == "done") toDos = toDos.Where(t => t.IsDone);
                if(taskParams.Status == "todo") toDos = toDos.Where(t => !t.IsDone);
            }

            return await toDos.OrderByDescending(t => t.CreateDate).ToListAsync();
        }
    }
}