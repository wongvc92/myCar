export interface Auction {
  id: string;
  reservePrice: number;
  seller: string;
  winner?: string | null;
  soldAmount?: number | null;
  currentHighBid?: number | null;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  auctionEnd: string; // ISO Date string
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
}
