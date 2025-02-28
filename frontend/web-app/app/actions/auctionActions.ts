"use server";

import { FieldValues } from "react-hook-form";
import { Auction } from "../types/auction";
import { PageResponse } from "../types/pageResponse";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(
  pageNumber: number = 1
): Promise<PageResponse<Auction[]>> {
  return await fetchWrapper.get(`/search?page=${pageNumber}&pageSize=20`);
}

export async function updateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  return await fetchWrapper.put(
    `/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c`,
    data
  );
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post(`/auctions`, data);
}

export async function getAuction(id: string): Promise<Auction> {
  return await fetchWrapper.get(`/auctions/${id}`);
}

export async function updateAuction(id: string, data: FieldValues) {
  return await fetchWrapper.put(`/auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
  return await fetchWrapper.del(`/auctions/${id}`);
}
