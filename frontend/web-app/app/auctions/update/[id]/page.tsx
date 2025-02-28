import React from "react";
import AuctionForm from "../../AuctionForm";
import { getAuction } from "@/app/actions/auctionActions";

const Update = async ({ params }: { params: { id: string } }) => {
  const data = await getAuction(params.id);
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <h3>Update your auction</h3>
      <p>Please update the details of your car</p>
      <AuctionForm auction={data} />
    </div>
  );
};

export default Update;
