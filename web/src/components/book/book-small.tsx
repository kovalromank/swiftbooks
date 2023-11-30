import { FC } from "react";
import Image from "next/image";
import { Button, Title } from "@mantine/core";

import bookCover1 from "@/images/book-cover-1.jpeg";

import classes from "./book-small.module.css";

export interface BookSmallProps {
  variant?: "default" | "cart";
}

export const BookSmall: FC<BookSmallProps> = ({ variant = "default" }) => {
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
        {variant === "cart" ? (
          <div className={classes.price}>1 x $24.99</div>
        ) : (
          <Button variant="light" color="red" size="compact-xs">
            REMOVE
          </Button>
        )}
      </div>
    </div>
  );
};
