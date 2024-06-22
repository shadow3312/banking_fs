import React from "react";
import Spinner from "./Spinner";

export default function LoadingOverlay() {
  return (
    <div className="absolute left-0 grid h-full w-full place-items-center border bg-black/30 dark:bg-black/60">
      <Spinner large />
    </div>
  );
}
