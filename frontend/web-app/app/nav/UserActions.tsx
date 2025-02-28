"use client";

import { User } from "next-auth";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiCog, HiUser } from "react-icons/hi";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useParamsStore } from "@/hooks/useParamsStore";

type Props = {
  user: User;
};
const UserActions = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const setParams = useParamsStore((state) => state.setParams);

  const setWinner = () => {
    setParams({
      winner: user.username,
      seller: undefined,
    });
    if (pathname !== "/") router.push("/");
  };

  const setSeller = () => {
    setParams({
      seller: user.username,
      winner: undefined,
    });
    if (pathname !== "/") router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <HiUser />
          Welcome {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={setSeller}>
          <HiUser />
          My Auctions
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setWinner}>
          <AiFillTrophy />
          Auctions won
        </DropdownMenuItem>
        <DropdownMenuItem>
          <AiFillCar />
          <Link href={"/auctions/create"}>Sell my car</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HiCog />
          <Link href={"/session"}>Session (dev only)</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <AiOutlineLogout /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
