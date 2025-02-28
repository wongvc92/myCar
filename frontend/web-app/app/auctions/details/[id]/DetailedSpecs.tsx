"use client";

import { Auction } from "@/app/types/auction";

type Props = {
  auction: Auction;
};

export default function DetailedSpecs({ auction }: Props) {
  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <table className="w-full border-collapse bg-white text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3 border border-gray-200">Attribute</th>
            <th className="p-3 border border-gray-200">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="p-3 font-semibold text-gray-700 border border-gray-200">
              Seller
            </td>
            <td className="p-3 border border-gray-200">{auction.seller}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3 font-semibold text-gray-700 border border-gray-200">
              Make
            </td>
            <td className="p-3 border border-gray-200">{auction.make}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3 font-semibold text-gray-700 border border-gray-200">
              Model
            </td>
            <td className="p-3 border border-gray-200">{auction.model}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3 font-semibold text-gray-700 border border-gray-200">
              Year
            </td>
            <td className="p-3 border border-gray-200">{auction.year}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3 font-semibold text-gray-700 border border-gray-200">
              Mileage
            </td>
            <td className="p-3 border border-gray-200">{auction.mileage} km</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3 font-semibold text-gray-700 border border-gray-200">
              Reserve Price
            </td>
            <td className="p-3 border border-gray-200">
              {auction.reservePrice > 0 ? "Yes" : "No"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
