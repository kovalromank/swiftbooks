import { Button, Title } from "@mantine/core";
import { FC } from "react";
import Image from "next/image";

import classes from "./book.module.css";

import bookCover1 from "@/images/book-cover-1.jpeg";

export const Book: FC = () => {
  return (
    <div className={classes.container}>
      <div>
        <Image
          src={bookCover1}
          alt="Book cover 1"
          width={150}
          height={150}
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <div className={classes.author}>Morgan Housel</div>
        <Title order={4} className={classes.title}>
          The Psychology of Money
        </Title>
        <div className={classes.price}>$24.99</div>
        <Button variant="light" color="violet" size="xs">
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};
