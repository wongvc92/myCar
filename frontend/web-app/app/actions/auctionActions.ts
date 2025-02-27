"use server";

import { auth } from "@/auth";
import { Auction } from "../types/auction";
import { PageResponse } from "../types/pageResponse";

export async function getData(
  pageNumber: number = 1
): Promise<PageResponse<Auction[]>> {
  const res = await fetch(
    `http://localhost:6001/search?pageSize=4&pageNumber=${pageNumber}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function updateAuctionTest() {
  console.log("updateAuctionTest");
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  const session = await auth();
  const res = await fetch(
    "http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    return { status: res.status, message: res.statusText };
  }
  return res.statusText;
}
