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
      fill
      alt="image of car"
      priority
      className={`
            object-cover group-hover:opacity-75 duration-700 ease-in-out
            ${
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            }
        `}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      onLoad={() => setIsLoading(false)}
    />
  );
};

export default CarImage;
