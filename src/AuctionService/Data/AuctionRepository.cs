using AuctionService.Dtos;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class AuctionRepository : IAuctionRepository
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;

    public AuctionRepository(AuctionDbContext context, IMapper mapper)
    {

        _context = context;
        _mapper = mapper;


    }
    public void AddAuction(Auction auction)
    {
        _context.Auctions.Add(auction);
    }

    public async Task<AuctionDto?> GetAuctionByIdAsync(Guid id)
    {
        var auction = await _context.Auctions
               .ProjectTo<AuctionDto>(_mapper.ConfigurationProvider)
               .FirstOrDefaultAsync(x => x.Id == id);



        return _mapper.Map<AuctionDto>(auction);
    }

    public async Task<Auction> GetAuctionEntityByIdAsync(Guid id)
    {
        var auction = await _context.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction == null)
        {
            throw new KeyNotFoundException($"Auction with id {id} not found.");
        }

        return auction;
    }

    public async Task<List<AuctionDto>> GetAuctionsAsync(string? date)
    {
        var query = _context.Auctions.OrderBy(x => x.Item!.Make).AsQueryable();

        if (!string.IsNullOrEmpty(date))
        {
            // Filter by date
            query = query.Where(x =>
                // Compare the date of the auction to the date provided
                x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }


        // Project the results to the AuctionDto
        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public void RemoveAuction(Auction auction)
    {
        _context.Auctions.Remove(auction);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
