import { FC } from "react";

import { Book } from "@/components/book/book";

import classes from "./book-catalog.module.css";

export const BookCatalog: FC = () => {
  return (
    <div className={classes.list}>
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <Book key={i} />
        ))}
    </div>
  );
};
