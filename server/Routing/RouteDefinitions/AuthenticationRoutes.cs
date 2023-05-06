using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;

namespace Witchermancer.Routing.RouteDefinitions;

public class AuthenticationRoutes : IRoutesDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        app.MapGet("/api/login", Login);
        app.MapGet("/api/logout", Logout);
        app.MapGet("/api/auth", IsUserAuthenticated);
    }

    private static IResult Login() =>
        Results.Challenge(
            new AuthenticationProperties {RedirectUri = "/"},
            new List<string> {GoogleDefaults.AuthenticationScheme}
        );

    private static async Task<IResult> Logout(HttpContext ctx, CancellationToken token)
    {
        await ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Results.Redirect("/");
    }

    private static bool IsUserAuthenticated(HttpContext ctx) => ctx.User.Identity?.IsAuthenticated ?? false;
}
