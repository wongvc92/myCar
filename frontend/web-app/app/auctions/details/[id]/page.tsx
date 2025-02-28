import { getAuction } from "@/app/actions/auctionActions";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import DetailedSpecs from "./DetailedSpecs";
import { getCurrentUser } from "@/app/actions/authActions";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const Details = async ({ params }: { params: { id: string } }) => {
  const data = await getAuction(params.id);
  const user = await getCurrentUser();

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <h3>
            {data.make} {data.model}
          </h3>
          {user?.username === data.seller && (
            <>
              <EditButton id={data.id} />
              <DeleteButton id={data.id} />
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-semibold">Time remaining</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 relative aspect-[4/3] rounded-lg overflow-hidden">
          <CarImage auction={data} />
        </div>
        <div className="border-2 rounded-lg p-2 bg-gray-100">
          <h3 className="text-2xl font-semibold">Bids</h3>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data} />
      </div>
    </div>
  );
};

export default Details;
