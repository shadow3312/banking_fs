"use client";

import { loadingActivityAtom } from "@/state/atom";
import { useRecoilState } from "recoil";

export function useLoading(
  componentId: string,
): [boolean, (isLoading: boolean) => void] {
  const [loading, setLoading] = useRecoilState(loadingActivityAtom);

  const setComponentLoading = (isLoading: boolean) => {
    setLoading((prevState) => ({
      ...prevState,
      [componentId]: isLoading,
    }));
  };

  return [loading[componentId] || false, setComponentLoading];
}
