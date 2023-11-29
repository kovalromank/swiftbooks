import { FC } from "react";
import Image from "next/image";
import { Button, Title } from "@mantine/core";

import bookCover1 from "@/images/book-cover-1.jpeg";

import classes from "./book-small.module.css";

export interface BookSmallProps {}

export const BookSmall: FC<BookSmallProps> = () => {
  return (
    <div className={classes.container}>
      <div>
        <Image
          src={bookCover1}
          alt="Book cover 1"
          width={75}
          height={75}
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <div className={classes.author}>Morgan Housel</div>
        <Title order={4} className={classes.title}>
          The Psychology of Money
        </Title>
        <Button variant="light" color="red" size="compact-xs">
          REMOVE
        </Button>
      </div>
    </div>
  );
};
