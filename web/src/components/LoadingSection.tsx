import React from "react";
import Spinner from "./Spinner";

export default function LoadingSection() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
