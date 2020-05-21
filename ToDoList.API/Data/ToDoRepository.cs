using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<ToDo>> getToDos(string userName)
        {
            var toDos = await dataContext.ToDos.Where(t => t.User.UserName == userName).ToListAsync();
            return toDos;
        }
    }
}