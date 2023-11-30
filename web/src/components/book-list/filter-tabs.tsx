"use client";

import { FC, useCallback, useEffect } from "react";
import { Tabs, TabsList, TabsTab } from "@mantine/core";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { tabs } from "./tabs";

import classes from "./filter-tabs.module.css";

export const FilterTabs: FC = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.has("tab") || !tabs.some(({ id }) => id === params.get("tab"))) {
      router.replace(`${pathname}?tab=public`);
    }
  }, [params, pathname, router]);

  const onTabChange = useCallback(
    (value: string | null) => {
      if (!value) {
        value = "public";
      }

      router.replace(`${pathname}?tab=${value}`);
    },
    [pathname, router],
  );

  return (
    <Tabs value={params.get("tab")} onChange={onTabChange} className={classes.tabs}>
      <TabsList className={classes.list}>
        {tabs.map(({ id, label }) => (
          <TabsTab key={id} value={id} className={classes.tab}>
            {label}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  );
};
