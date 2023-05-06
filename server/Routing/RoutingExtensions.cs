namespace Witchermancer.Routing;

public static class RoutingExtensions
{
    public static void UseRouteDefinitions(this WebApplication app)
    {
        var types = typeof(IRoutesDefinition).Assembly.DefinedTypes.Where(t =>
            t.ImplementedInterfaces.Contains(typeof(IRoutesDefinition)));

        foreach (var type in types)
        {
            var obj = Activator.CreateInstance(type);
            if (obj is IRoutesDefinition definition) definition.RegisterEndpoints(app);
        }
    }
}
