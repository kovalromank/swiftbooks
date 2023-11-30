import { Button, Select, Title } from "@mantine/core";
import { FC, useMemo } from "react";
import cx from "clsx";

import { ApiBook } from "@/api/types";

import classes from "./book.module.css";

const quantities = Array(10)
  .fill(0)
  .map((_, i) => String(i + 1));

export interface BookProps {
  variant?: "default" | "cart";
  data: ApiBook;
}

export const Book: FC<BookProps> = ({ variant = "default", data }) => {
  const format = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }),
    [],
  );

  return (
    <div className={cx(classes.container, { [classes.cart]: variant === "cart" })}>
      {data.thumbnail ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.thumbnail}
            alt="Book cover 1"
            width={150}
            height={150}
            className={classes.image}
          />
        </div>
      ) : null}
      <div className={classes.details}>
        {data.authors?.length ? <div className={classes.author}>{data.authors[0]}</div> : null}
        {data.title ? (
          <Title order={4} className={classes.title}>
            {data.title}
          </Title>
        ) : null}
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
        ) : data.price != null ? (
          <div className={classes.price}>{format.format(data.price)}</div>
        ) : null}
        {variant === "cart" ? (
          <Button variant="light" color="red" size="xs" className={classes.button}>
            REMOVE
          </Button>
        ) : data.price != null ? (
          <Button variant="light" color="violet" size="xs" className={classes.button}>
            ADD TO CART
          </Button>
        ) : (
          <Button variant="light" color="red" size="xs" className={classes.button} disabled>
            SOLD OUT
          </Button>
        )}
      </div>
    </div>
  );
};
