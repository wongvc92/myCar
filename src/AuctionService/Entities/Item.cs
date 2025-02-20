
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Entities
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Color { get; set; } = string.Empty;
        public int Mileage { get; set; }
        public string ImageUrl { get; set; } = string.Empty;

        // Foreign Key
        public Guid AuctionId { get; set; }

        // Navigation Property
        [ForeignKey("AuctionId")]
        public Auction Auction { get; set; } = null!;


    }
}