using BiddingService.Models;

namespace BiddingService.Dtos;

public class BidDto
{
    public required string Id { get; set; }
    public required string AuctionId { get; set; }
    public required string Bidder { get; set; }
    public DateTime BidTime { get; set; }
    public int Amount { get; set; }
    public required string BidStatus { get; set; }
}
