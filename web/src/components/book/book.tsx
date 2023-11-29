import { Button, Select, Title } from "@mantine/core";
import { FC } from "react";
import Image from "next/image";
import cx from "clsx";

import bookCover1 from "@/images/book-cover-1.jpeg";

import classes from "./book.module.css";

const quantities = Array(10)
  .fill(0)
  .map((_, i) => String(i + 1));

export interface BookProps {
  variant?: "default" | "cart";
}

export const Book: FC<BookProps> = ({ variant = "default" }) => {
  return (
    <div className={cx(classes.container, { [classes.cart]: variant === "cart" })}>
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
        {variant === "cart" ? (
          <div className={classes.quantityContainer}>
            <div className={classes.price}>$49.98</div>
            <Select
              withCheckIcon={false}
              value="2"
              variant="filled"
              size="xs"
              data={quantities}
              className={classes.quantitySelect}
              comboboxProps={{ withinPortal: false }}
            />
          </div>
        ) : (
          <div className={classes.price}>$24.99</div>
        )}
        {variant === "cart" ? (
          <Button variant="light" color="red" size="xs" className={classes.removeButton}>
            REMOVE
          </Button>
        ) : (
          <Button variant="light" color="violet" size="xs">
            ADD TO CART
          </Button>
        )}
      </div>
    </div>
  );
};
