"use client";

import { deleteAuction } from "@/app/actions/auctionActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useTransition } from "react";
import { toast } from "sonner";

const DeleteButton = ({ id }: { id: string }) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(() => {
      deleteAuction(id)
        .then((res) => {
          if (res.error) throw new Error(res.error.statusText);
          router.push("/");
        })
        .catch((error) => {
          if (error instanceof Error) {
            toast.error(error.message || "Failed to delete auction");
          }
        });
    });
  };
  return (
    <Button variant={"destructive"} onClick={handleDelete} disabled={isLoading}>
      Delete Auction
    </Button>
  );
};

export default DeleteButton;
