using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoList.API.Models;

namespace ToDoList.API.Data
{
    public interface IToDoRepository: IGenericRepository
    {
         Task<IEnumerable<ToDo>> getToDos(string userName);

         Task<ToDo> getToDo(string userName, int ToDoId);
    }
}