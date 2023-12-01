import { FC, useMemo } from "react";
import { Button, Title } from "@mantine/core";
import Link from "next/link";

import { BookListThumb } from "@/components/book-list/book-list-thumb";
import { ApiBookId, ApiBookList, ApiInfoBook } from "@/api/types";
import { useBook, useBookListBookIds } from "@/api/api";

import classes from "./book-list.module.css";

interface BooksGuardProps {
  bookList: ApiBookList;
  bookIds: ApiBookId[];
}

const BooksGuard: FC<BooksGuardProps> = ({ bookList, bookIds }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const responses = bookIds.map(({ id }) => useBook(id));

  if (responses.some((response) => !response.data)) {
    return null;
  }

  return (
    <BookListContent
      bookList={bookList}
      bookIds={bookIds}
      books={responses.map((response) => response.data!)}
    />
  );
};

interface BookIdsGuardProps {
  bookList: ApiBookList;
}

const BookIdsGuard: FC<BookIdsGuardProps> = ({ bookList }) => {
  const { data } = useBookListBookIds(bookList.id);

  if (data == null) {
    return null;
  }

  return <BooksGuard bookList={bookList} bookIds={data} />;
};

interface BookListContentProps {
  bookList: ApiBookList;
  bookIds: ApiBookId[];
  books: ApiInfoBook[];
}

const BookListContent: FC<BookListContentProps> = ({ bookList, books }) => {
  const format = useMemo(() => new Intl.NumberFormat(), []);

  const pages = books.reduce((acc, book) => acc + (book.numPages || 0), 0);

  return (
    <div className={classes.container}>
      <BookListThumb books={books} />
      <div className={classes.detailsContainer}>
        <div className={classes.creator}>{bookList.created_by_username}</div>
        <Title order={3} className={classes.title}>
          {bookList.list_name}
        </Title>
        <div className={classes.info}>Books: {books.length}</div>
        <div className={classes.info}>Pages: {format.format(pages)}</div>
        <div className={classes.spacer}></div>
        <Button
          component={Link}
          variant="light"
          color="violet"
          size="xs"
          href={`/book-lists/view/${bookList.id}`}
        >
          VIEW
        </Button>
      </div>
    </div>
  );
};

export interface BookListProps {
  data: ApiBookList;
}

export const BookList: FC<BookListProps> = ({ data }) => {
  return <BookIdsGuard bookList={data} />;
};
