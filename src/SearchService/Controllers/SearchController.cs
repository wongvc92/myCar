using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> SearchItems(
            [FromQuery] SearchParams searchParams)
        {
            // Create a paged search query
            var query = DB.PagedSearch<Item, Item>();

            // Sort by make
            query.Sort(x => x.Ascending(a => a.Make));

            // Filter by auction end date
            if (!string.IsNullOrEmpty(searchParams.SearchTerm))
            {
                query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
            }

            // Filter by seller

            query = searchParams.OrderBy switch
            {
                "make" => query.Sort(x => x.Ascending(a => a.Make)).Sort(x => x.Ascending(a => a.Model)),
                "new" => query.Sort(x => x.Ascending(a => a.CreatedAt)),
                _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))

            };

            // Filter by finished or ending soon

            query = searchParams.FilterBy switch
            {
                "finished" => query.Match(x => x.Where(a => a.AuctionEnd > DateTime.UtcNow)),
                "endingSoon" => query.Match(x => x.Where(a => a.AuctionEnd < DateTime.UtcNow.AddHours(6)
                    && a.AuctionEnd > DateTime.UtcNow)),
                _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
            };

            if (!string.IsNullOrEmpty(searchParams.Seller))
            {
                query.Match(x => x.Where(a => a.Seller == searchParams.Seller));
            }

            // Filter by winner
            if (!string.IsNullOrEmpty(searchParams.Winner))
            {
                query.Match(x => x.Where(a => a.Winner == searchParams.Winner));
            }

            // Paginate the results
            query.PageNumber(searchParams.PageNumber);

            // Set the page size
            query.PageSize(searchParams.PageSize);

            // Execute the query
            var result = await query.ExecuteAsync();


            // Return the results
            return Ok(new
            {
                results = result.Results,
                pageCount = result.PageCount,
                totalCount = result.TotalCount
            });
        }
    }
}