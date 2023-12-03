import { FC } from "react";
import { Anchor, Button, Title } from "@mantine/core";
import Link from "next/link";

import { BookListThumb } from "@/components/book-list/book-list-thumb";
import { ApiBookList } from "@/api/types";
import { useBookListBooks, useBookListPageCount } from "@/api/api";
import { Infos } from "@/components/infos";

import classes from "./book-list.module.css";

export interface BookListProps {
  data: ApiBookList;
}

export const BookList: FC<BookListProps> = ({ data }) => {
  const { data: books } = useBookListBooks(data.id);
  const { data: pages } = useBookListPageCount(data.id);

  if (!books) {
    return null;
  }

  return (
    <div className={classes.container}>
      <Anchor c="black" component={Link} href={`/book-lists/view/${data.id}`}>
        <BookListThumb books={books} />
      </Anchor>
      <div className={classes.detailsContainer}>
        <div className={classes.creator}>{data.created_by_username}</div>
        <Anchor c="black" component={Link} href={`/book-lists/view/${data.id}`}>
          <Title order={3} className={classes.title}>
            {data.list_name}
          </Title>
        </Anchor>

        <Infos
          infos={[
            { id: "books", label: "Books", value: books.length },
            { id: "pages", label: "Pages", value: pages, type: "number" },
          ]}
          size="sm"
        />

        <div className={classes.spacer}></div>
        <Button
          component={Link}
          variant="light"
          color="violet"
          size="xs"
          href={`/book-lists/view/${data.id}`}
          className={classes.button}
        >
          VIEW
        </Button>
      </div>
    </div>
  );
};
