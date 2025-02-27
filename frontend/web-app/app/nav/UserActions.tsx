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

type Props = {
  user: User;
};
const UserActions = ({ user }: Props) => {
  console.log("user", user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <HiUser />
          Welcome {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <AiFillTrophy />
          <Link href={"/"}>Auctions won</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <AiFillCar />
          <Link href={"/"}>Sell my car</Link>
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
