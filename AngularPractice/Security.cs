using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public static class Security
{
	static SecurityKey signing_key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
		"qwertyuiopasdfghjkl"
	));


	public static string readTokenUserId(HttpRequest req, out int user_id)
	{
		user_id = 0;
		string token_str = req.Headers["Authorization"].ToString().Replace("Bearer ", "");

		var token_handler = new JwtSecurityTokenHandler();

		SecurityToken token;
		ClaimsPrincipal principal;

		try {
			principal = token_handler.ValidateToken(token_str, new TokenValidationParameters {
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = signing_key,
				ValidateIssuer = false,
				ValidateAudience = false
			}, out token);
		}
		catch (Exception) {
			return "Could not validate token";
		}

		if (principal == null) {
			return "f";
		}

		var user_id_claim = principal.Claims.Where(claim =>
			claim.Type == "user_id"
		).FirstOrDefault();

		if (user_id_claim == null) {
			return "Token does not have an `user_id` field";
		}

		int token_user_id;

		if (int.TryParse(user_id_claim.Value, out token_user_id) == false) {
			return "Token `user_id` value could not be parsed";
		}

		user_id = token_user_id;

		return "";
	}
}
