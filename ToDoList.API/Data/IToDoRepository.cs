using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoList.API.Helpers;
using ToDoList.API.Models;

namespace ToDoList.API.Data
{
    public interface IToDoRepository: IGenericRepository
    {
         Task<IEnumerable<ToDo>> getToDos(string userName, TaskParams taskParams);

         Task<ToDo> getToDo(string userName, int ToDoId);
    }
}