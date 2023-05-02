using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// Database
{
	var ctx = new db.DatabaseContext();

	if (ctx.Database.CanConnect() == false) {
		throw new Exception("Could not connect to database");
	}
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<db.DatabaseContext>();
builder.Services.AddAuthentication(o => {
	o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o => {
	o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters {
		ValidIssuer = "Issuer",
		ValidateIssuer = true,
		ValidAudience = "Audience",
		ValidateAudience = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
			"qwertyuiopasdfghjkl"
		)),
		ValidateIssuerSigningKey = true
	};
});
builder.Services.AddAuthorization();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
