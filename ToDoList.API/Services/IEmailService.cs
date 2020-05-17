using System.Threading.Tasks;

namespace ToDoList.API.Services
{
    public interface IEmailService
    {
         Task SendEmail(string email, string subject, string message);
    }
}