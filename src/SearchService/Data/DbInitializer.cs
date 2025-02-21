
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data
{
    public class DbInitializer
    {
        public static async Task InitDb(WebApplication app)
        {
            await DB.InitAsync("SearchDb", MongoClientSettings
                .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

            await DB.Index<Item>()
                .Key(a => a.Make, KeyType.Text)
                .Key(a => a.Model, KeyType.Text)
                .Key(a => a.Color, KeyType.Text)
                .CreateAsync();

            var count = await DB.CountAsync<Item>();

            using var scope = app.Services.CreateScope();

            var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

            var items = await httpClient.GetItemsForSearchDb();

            Console.WriteLine(items.Count + " returned from the auction service...");

            if (items.Count > 0)
            {
                await DB.InsertAsync(items);
            }

            // if (count == 0)
            // {
            //     Console.WriteLine("Seeding database...");

            //     // Read the JSON data from the file

            //     var itemData = await File.ReadAllTextAsync("Data/auctions.json");

            //     // Configure the JSON deserializer to ignore case

            //     var options = new JsonSerializerOptions
            //     {
            //         PropertyNameCaseInsensitive = true
            //     };

            //     // Deserialize the JSON data into a list of Item objects
            //     var items = JsonSerializer.Deserialize<List<Item>>(itemData, options);

            //     // Insert the items into the database
            //     if (items != null)
            //     {
            //         await DB.InsertAsync(items);
            //     }
            // }
        }
    }
}