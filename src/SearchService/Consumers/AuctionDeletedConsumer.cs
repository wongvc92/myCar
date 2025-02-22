using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine($"Received AuctionUpdated event with Id: {context.Message.Id}");

        var item = _mapper.Map<Item>(context.Message);

        var result = await DB.Update<Item>()
            .Match(a => a.ID == context.Message.Id)
            .Modify(x => x.Color, item.Color)
            .Modify(x => x.Make, item.Make)
            .Modify(x => x.Model, item.Model)
            .Modify(x => x.Year, item.Year)
            .Modify(x => x.Mileage, item.Mileage)
            .ExecuteAsync();

        if (!result.IsAcknowledged) throw new MessageException(typeof(AuctionUpdated), "Failed to update item");
    }
}
