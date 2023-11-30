"use client";

import { FC } from "react";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

import { Header } from "@/components/header";
import { Hr } from "@/components/hr";
import { FilterTabs } from "./filter-tabs";
import { BookList } from "./book-list";
import { useFilterTab } from "./use-filter-tab";

import classes from "./book-lists.module.css";

export const BookLists: FC = () => {
  const tab = useFilterTab();

  return (
    <>
      <Header
        action={
          <Button
            leftSection={<IconPlus size="1rem" />}
            component={Link}
            href="/book-lists/create"
            variant="filled"
          >
            CREATE
          </Button>
        }
      >
        Browse {tab === "public" ? "public" : "your"} book lists
      </Header>
      <FilterTabs />
      <div className={classes.listContainer}>
        <BookList />
        <Hr />
        <BookList />
        <Hr />
        <BookList />
        <Hr />
        <BookList />
        <Hr />
        <BookList />
      </div>
    </>
  );
};
