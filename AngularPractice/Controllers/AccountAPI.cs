using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AngularPractice.Controllers
{
	[ApiController]
	[Route("api/account")]
	public class AccountAPI : ControllerBase
	{
		db.DatabaseContext ctx;

		public AccountAPI(db.DatabaseContext new_ctx) {
			ctx = new_ctx;
		}

		[NonAction]
		bool _checkUsername(string username, out string err_msg)
		{
			if (username.Length == 0) {
				err_msg = "User name cannot be empty";
				return false;
			}

			var user = ctx.users
				.Where(user => user.name == username)
				.FirstOrDefault()
			;

			if (user != null) {
				err_msg = "User name already exists";
				return false;
			}

			err_msg = "";
			return true;
		}

		public class IsUsernameUniqueRequest
		{
			public string username { get; set; }
		}

		public class IsProposedUsernameOkResponse
		{
			public bool ok { get; set; }
			public string err_msg { get; set; }
		}

		[HttpPost("checkUsername")]
		public ActionResult checkUsername(IsUsernameUniqueRequest req)
		{
			string err_msg;

			return Ok(new IsProposedUsernameOkResponse {
				ok = _checkUsername(req.username, out err_msg),
				err_msg = err_msg
			});
		}

		[NonAction]
		bool _checkPassword(string password, out string err_msg)
		{
			if (password.Length < 4) {
				err_msg = "Password is too short";
				return false;
			}

			err_msg = "";
			return true;
		}

		public class IsProposedPasswordOkRequest
		{
			public string password { get; set; }
		}

		public class IsProposedPasswordOkResponse
		{
			public bool ok { get; set; }
			public string err_msg { get; set; }
		}

		[HttpPost("checkPassword")]
		public IsProposedPasswordOkResponse checkPassword(IsProposedPasswordOkRequest req)
		{
			string err_msg;

			return new IsProposedPasswordOkResponse {
				ok = _checkPassword(req.password, out err_msg),
				err_msg = err_msg
			};
		}

		public class CreateAccountRequest
		{
			public string name { get; set; }
			public string password { get; set; }
		}

		[HttpPost("createAccount")]
		[AllowAnonymous]
		public ActionResult createAccount(CreateAccountRequest req)
		{
			string err_msg;

			if (_checkUsername(req.name, out err_msg) == false) {
				return BadRequest("Username is invalid");
			}

			if (_checkPassword(req.password, out err_msg) == false) {
				return BadRequest("Password is invalid");
			}

			ctx.users.Add(new db.User {
				name = req.name,
				password = req.password,
			});

			ctx.SaveChanges();

			return Ok();
		}

		public class LoginRequest
		{
			public string name { get; set; }
			public string password { get; set; }
		}

		public class LoginResponse
		{
			public bool ok { get; set; }
			public string token { get; set; }
		}

		[HttpPost("login")]
		[AllowAnonymous]
		public LoginResponse login(LoginRequest req)
		{
			bool user_found = false;

			if (req.name == "Name" && req.password == "1234") {
				user_found = true;
			}
			
			if (user_found == false) {
				return new LoginResponse { ok = false };
			}

			var issuer = "Issuer";
			var audience = "Audience";
			var key = Encoding.UTF8.GetBytes("qwertyuiopasdfghjkl");

			var token_descp = new SecurityTokenDescriptor {
				Subject = new ClaimsIdentity(new[] {
					new Claim("Id", Guid.NewGuid().ToString()),
					new Claim(JwtRegisteredClaimNames.Sub, req.name),
					new Claim(JwtRegisteredClaimNames.Email, req.name),
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
				}),
				Expires = DateTime.UtcNow.AddMinutes(5),
				Issuer = issuer,
				Audience = audience,
				SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(key),
					SecurityAlgorithms.HmacSha512
				)
			};

			var token_handler = new JwtSecurityTokenHandler();
			var token = token_handler.CreateToken(token_descp);
			return new LoginResponse {
				ok = true,
				token = token_handler.WriteToken(token)
			};
		}
	}
}
