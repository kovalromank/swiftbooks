import { FC } from "react";

import { Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

import { Book } from "@/components/book/book";
import { ApiSearchBook } from "@/api/types";

import classes from "./book-catalog.module.css";

interface BookCatalogProps {
  data: ApiSearchBook[];
}

export const BookCatalog: FC<BookCatalogProps> = ({ data }) => {
  if (!data.length) {
    return (
      <Alert color="orange" title="No books found" icon={<IconExclamationCircle />} maw="24rem" />
    );
  }

  return (
    <div className={classes.list}>
      {data.map((book) => (
        <Book key={book.id} data={book} />
      ))}
    </div>
  );
};
