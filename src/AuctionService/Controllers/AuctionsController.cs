using System.Security.Claims;
using AuctionService.Data;
using AuctionService.Dtos;
using AuctionService.Entities;
using AutoMapper;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AuctionService.Controllers
{
    [ApiController]
    [Route("api/auctions")]
    public class AuctionsController : ControllerBase
    {
        private readonly IAuctionRepository _repo;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public AuctionsController(IAuctionRepository repo, IMapper mapper,
            IPublishEndpoint publishEndpoint)
        {
            _repo = repo;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;

        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string? date)

        {
            return await _repo.GetAuctionsAsync(date);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
        {
            var auction = await _repo.GetAuctionByIdAsync(id);
            if (auction == null)
            {
                return NotFound();
            }

            return auction;

        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
        {

            var auction = _mapper.Map<Auction>(auctionDto);

            auction.Seller = User.Identity!.Name!;

            _repo.AddAuction(auction);

            var newAuction = _mapper.Map<AuctionDto>(auction);

            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

            var result = await _repo.SaveChangesAsync();



            if (!result) return BadRequest("Failed to create auction");

            return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
        }


        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction([FromRoute] Guid id, [FromBody] UpdateAuctionDto updateAuctionDto)
        {
            var auction = await _repo.GetAuctionEntityByIdAsync(id);

            if (auction == null)
            {
                return NotFound();
            }

            if (auction.Seller != User.Identity?.Name)
            {
                return Forbid();
            }


            auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
            auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
            auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
            auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
            auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;



            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));


            var result = await _repo.SaveChangesAsync();

            if (result) return Ok();
            return BadRequest("Problem saving changes");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuction([FromRoute] Guid id)
        {
            var auction = await _repo.GetAuctionEntityByIdAsync(id);


            if (auction == null)
            {
                return NotFound();
            }
            if (auction.Seller != User.Identity?.Name)
            {
                return Forbid();
            }

            _repo.RemoveAuction(auction);

            await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });

            var result = await _repo.SaveChangesAsync();
            if (result) return Ok();
            return BadRequest("Problem delete auction");
        }
    }
}