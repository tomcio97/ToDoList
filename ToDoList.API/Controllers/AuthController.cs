using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using ToDoList.API.Configuration;
using ToDoList.API.Dtos;
using ToDoList.API.Models;
using ToDoList.API.Services;

namespace ToDoList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEmailService emailService;
        private readonly JwtBearerTokenSettings jwtBearerTokenSettings;
        private readonly IMapper mapper;
        public AuthController(UserManager<ApplicationUser> userManager, IOptions<JwtBearerTokenSettings> jwtTokenOptions, IEmailService emailService, IMapper mapper)
        {
            this.mapper = mapper;
            this.emailService = emailService;
            this.userManager = userManager;
            this.jwtBearerTokenSettings = jwtTokenOptions.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegister)
        {
            if (ModelState.IsValid || userForRegister != null)
            {
                var user = mapper.Map<ApplicationUser>(userForRegister);

                var result = await userManager.CreateAsync(user, userForRegister.Password);
                if(!result.Succeeded)
                {
                    var dictionary = new ModelStateDictionary();

                    foreach(IdentityError error in result.Errors) dictionary.AddModelError(error.Code, error.Description);
                
                    return new BadRequestObjectResult(new {Message = "User Registration Failed", Errors = dictionary});
                }

                var emailConfirmationToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
                byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(emailConfirmationToken);
                var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

                string link = "http://localhost:5000/api/auth/confirm?email=" + user.Email + "&token=" + codeEncoded;

                await emailService.SendEmail(user.Email, "Confirmation email link", link);

                return Ok("Succes, Check your email and confirm this registration");
            }

            return BadRequest("User Registration Failed");
        }

        [HttpGet]
        [Route("Confirm")]
        public async Task<IActionResult> ConfirmRegistration([FromQuery] string token, string email)
        {
            if(email != null && token != null)
            {
                var user = await userManager.FindByEmailAsync(email);
                if(user != null)
                {
                    var codeDecodedBytes = WebEncoders.Base64UrlDecode(token);
                    var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);

                    var result = await userManager.ConfirmEmailAsync(user, codeDecoded);

                        if(result.Succeeded) return Ok("Confirmed your Account");

                    var dictionary = new ModelStateDictionary();

                    foreach(IdentityError error in result.Errors) dictionary.AddModelError(error.Code, error.Description);

                    return new BadRequestObjectResult(new {Message = "Confirm failed", Errors = dictionary});
                }

            }
            return BadRequest("Confirm Failed");
        }
    }
}