using Microsoft.AspNetCore.Authentication.Cookies;
using Witchermancer.Routing;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<CookiePolicyOptions>(options => { options.Secure = CookieSecurePolicy.Always; });

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

        options.Events.OnRedirectToAuthorizationEndpoint = arg =>
        {
            if (!arg.RedirectUri.Contains("redirect_uri=https", StringComparison.OrdinalIgnoreCase))
                arg.RedirectUri = arg.RedirectUri.Replace("redirect_uri=http", "redirect_uri=https",
                    StringComparison.OrdinalIgnoreCase);
            arg.HttpContext.Response.Redirect(arg.RedirectUri);
            return Task.CompletedTask;
        };
    });

builder.Services.AddControllers();


var app = builder.Build();

app.UseCookiePolicy();
app.Use(async (ctx, next) =>
{
    if (ctx.Request.Scheme != "https")
    {
        var logger = ctx.RequestServices.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Request to {}://{}{} changed to https://{}{}", ctx.Request.Scheme, ctx.Request.Host,
            ctx.Request.PathBase, ctx.Request.Host, ctx.Request.PathBase);
        ctx.Request.Scheme = "https";
    }

    await next(ctx);
});
app.UseAuthentication();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouteDefinitions();

app.MapGet("/api/hello",
    (HttpContext ctx) => ctx.User.Claims.Select(x => new {x.Type, x.Value}).ToList());

app.Run();
