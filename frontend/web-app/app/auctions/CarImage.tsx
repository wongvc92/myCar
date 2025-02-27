"use client";

import Image from "next/image";
import { Auction } from "../types/auction";
import { useState } from "react";

type Props = {
  auction: Auction;
};

const CarImage = ({ auction }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={auction.imageUrl}
      alt={`Image of ${auction.model} ${auction.make} in ${auction.color}`}
      fill
      priority
      className={`
                    object-cover group-hover:opacity-75 duration-700 ease-in-out 
                    ${isLoading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-none scale-110"}
                `}
      sizes="(max-width: 768px) 50vw, 100vw, (max-width: 1024px) 33vw"
      onLoad={() => setIsLoading(false)}
    />
  );
};

export default CarImage;
