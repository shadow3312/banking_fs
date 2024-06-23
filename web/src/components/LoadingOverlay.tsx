import React from "react";
import Spinner from "./Spinner";

export default function LoadingOverlay({ large = false }: { large?: boolean }) {
  return (
    <div className="absolute left-0 grid h-full w-full place-items-center border bg-black/20 dark:bg-black/60">
      <Spinner large={large} />
    </div>
  );
}
