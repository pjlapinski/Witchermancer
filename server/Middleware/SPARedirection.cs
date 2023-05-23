namespace Witchermancer.Middleware;

public class SpaRedirection
{
    private readonly RequestDelegate _next;
    private readonly ILogger<SpaRedirection> _logger;

    public SpaRedirection(RequestDelegate next, ILogger<SpaRedirection> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value;
        if (!(path?.StartsWith("/api") ?? true) && !Path.HasExtension(path)) context.Request.Path = "/index.html";
        await _next(context);
    }
}

public static class SpaRedirectionExtensions
{
    public static IApplicationBuilder UseSpaRedirection(this IApplicationBuilder builder) =>
        builder.UseMiddleware<SpaRedirection>();
}
