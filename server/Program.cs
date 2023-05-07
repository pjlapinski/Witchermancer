using Witchermancer;

var app = Setup.GetBuilder(args).BuildApplication();

// temp, for testing
app.MapGet("/api/hello",
    (HttpContext ctx) => ctx.User.Claims.Select(x => new {x.Type, x.Value}).ToList());

app.Run();
