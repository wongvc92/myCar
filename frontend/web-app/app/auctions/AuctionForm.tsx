"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "../components/FormInput";
import FormDateInput from "../components/FormDateInput";
import { createAuction, updateAuction } from "../actions/auctionActions";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Auction } from "../types/auction";
import { useEffect } from "react";

type Props = {
  auction?: Auction;
};
const AuctionForm = ({ auction }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (auction) {
      reset(auction);
    }
  }, [auction, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = "";
      let res;
      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(auction.id, data);
          id = auction.id;
        }
      }
      if (res.error) {
        throw new Error(res.error.statusText);
      }
      toast.success("Auction created successfully");
      router.push(`/auctions/details/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to create auction");
      }
    }
  };
  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <FormInput
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <FormInput
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormInput
          label="Year"
          name="year"
          type="number"
          control={control}
          rules={{ required: "Year is required" }}
        />
        <FormInput
          label="Mileage"
          name="mileage"
          type="number"
          control={control}
          rules={{ required: "Mileage is required" }}
        />
      </div>

      {pathname === "/auctions/create" && (
        <>
          <FormInput
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              type="number"
              control={control}
              rules={{ required: "Reserve Price is required" }}
            />
            <FormDateInput
              label="Auction end date/time"
              name="AuctionEnd"
              control={control}
              showTimeSelect
              dateFormat="dd MMMM yyyy h:mm a"
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button variant={"destructive"}>Cancel</Button>
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AuctionForm;
