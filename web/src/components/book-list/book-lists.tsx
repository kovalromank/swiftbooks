"use client";

import { FC, Fragment } from "react";
import { Button } from "@mantine/core";
import { IconExclamationCircle, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Alert } from "@mantine/core";

import { Header } from "@/components/header";
import { Hr } from "@/components/hr";
import { FilterTabs } from "./filter-tabs";
import { BookList } from "./book-list";
import { useFilterTab } from "./use-filter-tab";
import { useRecentBookLists } from "@/api/api";

import classes from "./book-lists.module.css";

export const BookLists: FC = () => {
  const tab = useFilterTab();

  const { data, isLoading, isSuccess } = useRecentBookLists();

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
      {(!isLoading && !isSuccess) || data?.length === 0 ? (
        <Alert
          color="orange"
          title="No public book lists found"
          icon={<IconExclamationCircle />}
          maw="24rem"
        />
      ) : (
        <div className={classes.listContainer}>
          {(data || []).map((bookList, i) => (
            <Fragment key={bookList.id}>
              {i ? <Hr /> : null}
              <BookList data={bookList} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};
