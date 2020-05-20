using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
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
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegister)
        {
            if (userForRegister != null)
            {
                var user = mapper.Map<ApplicationUser>(userForRegister);

                var result = await userManager.CreateAsync(user, userForRegister.Password);
                if(!result.Succeeded)
                {
                    var dictionary = new ModelStateDictionary();

                    foreach(IdentityError error in result.Errors) dictionary.AddModelError(error.Code, error.Description);
                
                    return new BadRequestObjectResult(dictionary);
                }

               await SendConfirmationEmail(user.Email);

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

        [HttpGet]
        [Route("registerToken")]
        public async Task<IActionResult> SendConfirmationEmail([FromQuery] string email)
        {
            ApplicationUser user;
            if(email != null)
            {
                user = await userManager.FindByEmailAsync(email);

            if(user != null)
            {
                var emailConfirmationToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
                byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(emailConfirmationToken);
                var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

                string link = "http://localhost:4200/potwierdzenie?email=" + user.Email + "&token=" + codeEncoded;

                await emailService.SendEmail(user.Email, "Confirmation email link", "<a href=\"" + link + "\">Kliknij tutaj, aby potwierdzić rejestrację");

                return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login (UserForLoginDto userForLogin)
        {
            ApplicationUser user;
            if(ModelState.IsValid && userForLogin != null && (user = await ValidateUser(userForLogin)) != null)
            {
                var token = GenerateToken(user);
                return Ok(new {token = token});
            }

            return BadRequest("Login Failed");
        }

        [HttpGet]
        [Route("Reset/{email}")]
        public async Task<IActionResult> ResetPassword(string email)
        {
            if(email != null)
            {
                var user = await userManager.FindByEmailAsync(email);
                if(user == null)
                {
                    return BadRequest("Email not exist");
                }
                    var emailResetPasswordToken = await userManager.GeneratePasswordResetTokenAsync(user);
                    byte[] tokenBytes = Encoding.UTF8.GetBytes(emailResetPasswordToken);
                    var codeEncoded = WebEncoders.Base64UrlEncode(tokenBytes);
                    string link = "http://localhost:4200/resetpassword?email=" + user.Email + "&token=" + codeEncoded;
                    await emailService.SendEmail(user.Email, "Reset password", link);
                    return Ok();
            }

            return BadRequest("Reset password failed");
        }

        [HttpPut]
        [Route("ConfirmReset/{email}")]
        public async Task<IActionResult> ConfirmResetPassword(UserForConfirmPassword userForConfirm, string email)
        {
            if(email != null && userForConfirm.token != null && userForConfirm.password != null)
            {
                var user = await userManager.FindByEmailAsync(email);
                if(user != null)
                {
                    var codeDecodedBytes = WebEncoders.Base64UrlDecode(userForConfirm.token);
                    var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
                    var result = await userManager.ResetPasswordAsync(user, codeDecoded, userForConfirm.password);
                    if(result.Succeeded) return Ok("Password changed");

                    var dictionary = new ModelStateDictionary();
                    foreach(IdentityError error in result.Errors)
                    {
                        dictionary.AddModelError(error.Code, error.Description);
                    }

                     return new BadRequestObjectResult(dictionary);
                }

                return BadRequest("Email not exist");
            }

            return BadRequest("Reset password failed");
        }

        private async Task<ApplicationUser> ValidateUser(UserForLoginDto userForLogin)
        {
            var user = await userManager.FindByNameAsync(userForLogin.UserName);
            if(userForLogin != null)
            {
                if(await userManager.IsEmailConfirmedAsync(user))
                {
                    var result = userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, userForLogin.Password);
                   
                    if(result == PasswordVerificationResult.Success) return user;
                }
            }
            return null;
        }

        private Object GenerateToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtBearerTokenSettings.SecretKey);
            
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),

                Expires = DateTime.UtcNow.AddHours(jwtBearerTokenSettings.ExpiryTimeInHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = jwtBearerTokenSettings.Audience,
                Issuer = jwtBearerTokenSettings.Issuer
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}