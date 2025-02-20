using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data
{
    public class AuctionDbContext : DbContext
    {
        public AuctionDbContext(DbContextOptions<AuctionDbContext> options) : base(options)
        {
        }

        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Item> Items { get; set; } // ✅ Added Item Table

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ Explicitly define one-to-one relationship
            modelBuilder.Entity<Auction>()
                .HasOne(a => a.Item)
                .WithOne(i => i.Auction)
                .HasForeignKey<Item>(i => i.AuctionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}