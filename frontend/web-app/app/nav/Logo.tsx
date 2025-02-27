"use client";

import { useRouter } from "next/navigation";
import { AiOutlineCar } from "react-icons/ai";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center space-x-2 text-3xl font-semibold text-red-500 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <AiOutlineCar />
      <div>My Car Auctions</div>
    </div>
  );
};

export default Logo;
