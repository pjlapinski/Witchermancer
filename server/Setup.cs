using Microsoft.AspNetCore.Authentication.Cookies;
using Witchermancer.Middleware;
using Witchermancer.Routing;

namespace Witchermancer;

public static class Setup
{
    public static WitchermancerBuilder GetBuilder(string[] args)
    {
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
        return new WitchermancerBuilder(builder);
    }
}

public class WitchermancerBuilder
{
    private readonly WebApplicationBuilder _builder;

    public WitchermancerBuilder(WebApplicationBuilder builder)
    {
        _builder = builder;
    }

    public WebApplication BuildApplication()
    {
        var app = _builder.Build();

        app.UseCookiePolicy();
        app.UseRequestSchemeForceHttps();
        app.UseAuthentication();

        app.UseHttpsRedirection();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.UseRouteDefinitions();

        return app;
    }
}
