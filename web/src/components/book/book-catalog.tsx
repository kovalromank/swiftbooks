import { FC } from "react";

import { Book } from "@/components/book/book";

import classes from "./book-catalog.module.css";

interface BookCatalogProps {
  n?: number;
}

export const BookCatalog: FC<BookCatalogProps> = ({ n = 9 }) => {
  return (
    <div className={classes.list}>
      {Array(n)
        .fill(0)
        .map((_, i) => (
          <Book key={i} />
        ))}
    </div>
  );
};
