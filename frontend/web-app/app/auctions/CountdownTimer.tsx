"use client";

import { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";

type Props = {
  auctionEnd: string;
};

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  return (
    <div
      className={`border-2 border-white text-white py-1 
        px-2 rounded-lg flex justify-center 
        ${
          completed
            ? "bg-red-600"
            : days === 0 && hours < 10
              ? "bg-amber-600"
              : "bg-green-600"
        }`}
    >
      {completed ? (
        <span>Finished</span>
      ) : (
        <span suppressContentEditableWarning={true}>
          {`${days}:${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}
        </span>
      )}
    </div>
  );
};

export default function CountdownTimer({ auctionEnd }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once mounted on the client
  }, []);

  // Avoid rendering on the server to prevent hydration errors
  if (!isClient) return null;

  return (
    <div>
      <Countdown date={new Date(auctionEnd)} renderer={renderer} />
    </div>
  );
}
