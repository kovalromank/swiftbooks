import { FC } from "react";
import Image from "next/image";
import cx from "clsx";

import bookCover1 from "@/images/book-cover-1.jpeg";
import bookCover2 from "@/images/book-cover-2.jpeg";
import bookCover3 from "@/images/book-cover-3.jpeg";

import classes from "./book-list-thumb.module.css";

export const BookListThumb: FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "inline-block" }}>
        <Image
          src={bookCover1}
          alt="Book cover"
          width={150}
          height={150}
          className={cx(classes.image, classes.imageLarge)}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <Image
          src={bookCover2}
          alt="Book cover"
          width={75}
          height={75}
          className={cx(classes.image, classes.imageSmall)}
        />
        <Image
          src={bookCover3}
          alt="Book cover"
          width={75}
          height={75}
          className={cx(classes.image, classes.imageSmall)}
        />
      </div>
    </div>
  );
};
