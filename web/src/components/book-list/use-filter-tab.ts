import { useSearchParams } from "next/navigation";

import { tabs } from "./tabs";

export const useFilterTab = () => {
  const params = useSearchParams();

  if (!params.has("tab") || !tabs.some(({ id }) => id === params.get("tab"))) {
    return "public";
  }

  return params.get("tab")!;
};
