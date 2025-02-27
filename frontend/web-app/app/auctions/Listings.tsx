import { getData } from "../actions/auctionActions";
import AuctionCard from "./AuctionCard";

const Listings = async () => {
  const data = await getData();

  return (
    <div className="grid  gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data &&
        data.results.map((auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
    </div>
  );
};

export default Listings;
