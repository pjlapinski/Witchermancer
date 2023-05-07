namespace Witchermancer.Middleware;

public class RequestSchemeForceHttps
{
    private readonly RequestDelegate _next;

    public RequestSchemeForceHttps(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Scheme != "https") context.Request.Scheme = "https";
        await _next(context);
    }
}

public static class RequestSchemeForceHttpsExtensions
{
    public static IApplicationBuilder UseRequestSchemeForceHttps(this IApplicationBuilder builder) =>
        builder.UseMiddleware<RequestSchemeForceHttps>();
}
