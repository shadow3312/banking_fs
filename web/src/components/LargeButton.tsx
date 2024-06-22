import React from "react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

interface LargeButtonProps {
  text: string;
  isLoading?: boolean;
}
export default function LargeButton({
  text,
  isLoading = false,
}: LargeButtonProps) {
  return (
    <Button disabled={isLoading} className="w-full" type="submit">
      {isLoading && (
        <div className="mr-2">
          <Spinner />
        </div>
      )}
      {text}
    </Button>
  );
}
