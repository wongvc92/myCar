import React from "react";
import AuctionForm from "../AuctionForm";

const Create = () => {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <h3>Sell your car!</h3>
      <p>Please enter the detauls of your car</p>
      <AuctionForm />
    </div>
  );
};

export default Create;
