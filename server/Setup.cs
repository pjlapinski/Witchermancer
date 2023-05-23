using Microsoft.AspNetCore.Authentication.Cookies;
using Witchermancer.Middleware;
using Witchermancer.Models.Config;
using Witchermancer.Routing;
using Witchermancer.Services;

namespace Witchermancer;

public static class Setup
{
    public static WitchermancerBuilder GetBuilder(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.Configure<CookiePolicyOptions>(options => { options.Secure = CookieSecurePolicy.Always; });

        builder.Services
            .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options => { options.LoginPath = "/api/login"; })
            .AddGoogle(options =>
            {
                var settings = builder.Configuration.GetSection("Google").Get<GoogleSettings>();
                options.ClientId = settings.ClientId;
                options.ClientSecret = settings.ClientSecret;
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
        builder.Services.AddAuthorization(options => { options.InvokeHandlersAfterFailure = false; });

        builder.Services.Configure<CharactersStoreDatabaseSettings>(builder.Configuration.GetSection("MongoDb"));
        builder.Services.AddSingleton<CharactersService>();

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
        app.UseSpaRedirection();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseHttpsRedirection();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.UseRouteDefinitions();

        return app;
    }
}
