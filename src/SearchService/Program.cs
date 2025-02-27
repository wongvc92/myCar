using Polly;
using SearchService.Data;
using SearchService.Services;
using Polly.Extensions.Http;
using MassTransit;
using SearchService.Consumers;

var builder = WebApplication.CreateBuilder(args);

try
{
    Console.WriteLine("🚀 Starting SearchService...");

    // Add services to the container
    builder.Services.AddControllers();
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    // Register HTTP Client with retry policy
    builder.Services.AddHttpClient<AuctionSvcHttpClient>()
        .AddPolicyHandler(GetPolicy());

    // Configure MassTransit with RabbitMQ
    builder.Services.AddMassTransit(x =>
    {
        x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
        x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));

        x.UsingRabbitMq((context, cfg) =>
        {
            try
            {
                Console.WriteLine("🔗 Connecting to RabbitMQ...");

                cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
                {
                    host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest")!);
                    host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest")!);
                });

                cfg.ReceiveEndpoint("search-auction-created", e =>
                {
                    e.UseMessageRetry(r => r.Interval(5, 5));
                    e.ConfigureConsumer<AuctionCreatedConsumer>(context);
                });

                cfg.ConfigureEndpoints(context);

                Console.WriteLine("✅ RabbitMQ connection successful.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ ERROR: Failed to connect to RabbitMQ: {ex.Message}");
            }
        });
    });

    var app = builder.Build();

    // Configure Middleware
    app.UseAuthorization();
    app.MapControllers();

    // Database Seeding on Startup
    app.Lifetime.ApplicationStarted.Register(async () =>
    {
        try
        {
            Console.WriteLine("📦 Initializing MongoDB...");
            await DbInitializer.InitDb(app);
            Console.WriteLine("✅ MongoDB initialization complete.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ ERROR: Failed to initialize MongoDB: {ex.Message}");
        }
    });

    // Run Application
    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"❌ FATAL ERROR: {ex.Message}");
}
finally
{
    Console.WriteLine("🔄 Service shutting down...");
}

// Define the retry policy
static IAsyncPolicy<HttpResponseMessage> GetPolicy() =>
    HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
        .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));