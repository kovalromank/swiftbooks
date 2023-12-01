import { FC } from "react";
import cx from "clsx";

import { ApiInfoBook } from "@/api/types";

import classes from "./book-list-thumb.module.css";

export interface BookListThumbProps {
  books: ApiInfoBook[];
}

export const BookListThumb: FC<BookListThumbProps> = ({ books }) => {
  const images = books
    .map((book) => book.thumbnail || book.fullImage!)
    .filter((image) => Boolean(image));

  return (
    <div className={classes.container}>
      <div className={classes.column}>
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt="Book cover"
            width={150}
            height={150}
            className={cx(classes.image, classes.imageLarge)}
          />
        ) : null}
      </div>
      <div className={classes.column}>
        {images.length > 1 ? (
          <img
            src={images[1]}
            alt="Book cover"
            width={75}
            height={75}
            className={cx(classes.image, classes.imageSmall)}
          />
        ) : null}
        {images.length > 2 ? (
          <img
            src={images[2]}
            alt="Book cover"
            width={75}
            height={75}
            className={cx(classes.image, classes.imageSmall)}
          />
        ) : null}
      </div>
    </div>
  );
};
