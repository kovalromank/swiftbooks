import { FC } from "react";
import { Button, Title } from "@mantine/core";

import { BookListThumb } from "@/components/book-list/book-list-thumb";

import classes from "./book-list.module.css";
import Link from "next/link";

export const BookList: FC = () => {
  return (
    <div className={classes.container}>
      <BookListThumb />
      <div className={classes.detailsContainer}>
        <div className={classes.creator}>Stacy Bob</div>
        <Title order={3} className={classes.title}>
          Great reads 1
        </Title>
        <div className={classes.info}>Books: 5</div>
        <div className={classes.info}>Pages: 1204</div>
        <div className={classes.spacer}></div>
        <Button
          component={Link}
          variant="light"
          color="violet"
          size="xs"
          href="/book-lists/view/123"
        >
          VIEW
        </Button>
      </div>
    </div>
  );
};