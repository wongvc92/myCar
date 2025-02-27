"use client";

import React, { useTransition } from "react";
import { updateAuctionTest } from "../actions/auctionActions";
import { Button } from "@/components/ui/button";

const AuthTest = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = React.useState<any>(null);
  const [isPending, startTransition] = useTransition();

  function fetchAuthTest() {
    console.log("fetchAuthTest");
    startTransition(async () => {
      try {
        const data = await updateAuctionTest();
        setResults(data);
      } catch (error) {
        setResults(error);
      }
    });
  }
  return (
    <div className="flex items-center gap-4">
      <Button onClick={fetchAuthTest} disabled={isPending}>
        Test auth
      </Button>
      <div>{JSON.stringify(results)}</div>
    </div>
  );
};

export default AuthTest;
