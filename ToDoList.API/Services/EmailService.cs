using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ToDoList.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;
        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;

        }
        public async Task SendEmail(string email, string subject, string message)
        {
            using (var smtpClient = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = configuration["Email:Email"],
                    Password = configuration["Email:Password"]
                };

                smtpClient.Credentials = credential;
                smtpClient.Host = configuration["Email:Host"];
                smtpClient.Port = int.Parse(configuration["Email:Port"]);
                smtpClient.EnableSsl = true;

                using(var mailMessage = new MailMessage())
                {
                    mailMessage.To.Add(new MailAddress(email));
                    mailMessage.From = new MailAddress(configuration["Email:Email"]);
                    mailMessage.Subject = subject;
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Body = message;

                    smtpClient.Send(mailMessage);
                }
            }
            await Task.CompletedTask;
        }
    }
}