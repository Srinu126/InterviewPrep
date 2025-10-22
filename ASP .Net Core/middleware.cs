var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.Use(async(HttpContext context, RequestDelegate next) =>
{
    await context.Response.WriteAsync("Middleware #1: Before calling next\r\n");
    await next(context);
    await context.Response.WriteAsync("Middleware #1: After calling next\r\n");
});
//branching the pipeline
app.Map("/employees", (appBuilder) =>
{
    appBuilder.Use(async (HttpContext context, RequestDelegate next) =>
    {
        await context.Response.WriteAsync("Middleware #4: Before calling next\r\n");
        await next(context);
        await context.Response.WriteAsync("Middleware #4: After calling next\r\n");
    });

    appBuilder.Use(async (HttpContext context, RequestDelegate next) =>
    {
        await context.Response.WriteAsync("Middleware #5: Before calling next\r\n");
        await next(context);
        await context.Response.WriteAsync("Middleware #5: After calling next\r\n");
    });

});
//rejoinable branch
app.UseWhen((context) =>
{
    if (context.Request.Query.ContainsKey("name"))
    {
        return true;
    }
    return false;
}, (appBuilder) =>
{

    appBuilder.Use(async (HttpContext context, RequestDelegate next) =>
    {
        await context.Response.WriteAsync("Middleware #7: Before calling next\r\n");
        await next(context);
        await context.Response.WriteAsync("Middleware #7: After calling next\r\n");
    });

});

app.MapWhen((context) =>
{
    if (context.Request.Query.ContainsKey("id"))
    {
        return true;
    }
    return false;
}, (appBuilder) =>
{

    appBuilder.Use(async (HttpContext context, RequestDelegate next) =>
{
    await context.Response.WriteAsync("Middleware #6: Before calling next\r\n");
    await next(context);
    await context.Response.WriteAsync("Middleware #6: After calling next\r\n");
});

});

//terminal middleware
//app.Run(async (context) =>
//{
//    await context.Response.WriteAsync("Middleware Processed");
//});

app.Use(async (HttpContext context, RequestDelegate next) =>
{
    await context.Response.WriteAsync("Middleware #2: Before calling next\r\n");
    await next(context);
    await context.Response.WriteAsync("Middleware #2: After calling next\r\n");
});

app.Use(async (HttpContext context, RequestDelegate next) =>
{
    await context.Response.WriteAsync("Middleware #3: Before calling next\r\n");
    await next(context);
    await context.Response.WriteAsync("Middleware #3: After calling next\r\n");
});

app.Run();
