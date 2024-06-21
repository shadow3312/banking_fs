import React from "react";
import { Button } from "./ui/button";

interface LargeButtonProps {
  text: string;
}
export default function LargeButton({ text }: LargeButtonProps) {
  return (
    <Button className="w-full" type="submit">
      {text}
    </Button>
  );
}
