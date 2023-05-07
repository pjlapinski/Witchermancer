using Microsoft.AspNetCore.Authentication.Cookies;
using Witchermancer.Routing;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie()
    .AddGoogle(options =>
    {
        options.ClientId = builder.Configuration["Google:ClientId"];
        options.ClientSecret = builder.Configuration["Google:ClientSecret"];
        options.CallbackPath = new PathString("/api/signin-google");
        options.AuthorizationEndpoint += "?prompt=consent";
        options.AccessType = "offline";
        options.SaveTokens = true;
    });

builder.Services.AddControllers();


var app = builder.Build();

app.UseAuthentication();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouteDefinitions();

app.MapGet("/api/hello",
    (HttpContext ctx) => ctx.User.Claims.Select(x => new {x.Type, x.Value}).ToList());
app.MapGet("/api/path",
    (HttpContext ctx) => $"{ctx.Request.Scheme}://{ctx.Request.Host}{ctx.Request.PathBase}");

app.Run();
