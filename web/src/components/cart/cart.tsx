"use client";

import { FC, Fragment } from "react";
import { Button, Card } from "@mantine/core";
import Link from "next/link";

import { Book } from "@/components/book/book";

import classes from "./cart.module.css";
import { Hr } from "@/components/hr";

export interface CartProps {
  onClose?: () => void;
}

export const Cart: FC<CartProps> = ({ onClose }) => {
  return (
    <Card className={classes.container}>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Fragment key={i}>
            {i ? <Hr /> : null}
            <Book variant="cart" />
          </Fragment>
        ))}
      <div className={classes.spacer}></div>
      <div className={classes.total}>Total cost: $99.96</div>
      <Button
        component={Link}
        variant="filled"
        className={classes.button}
        href="/checkout"
        onClick={() => onClose?.()}
      >
        CHECKOUT
      </Button>
    </Card>
  );
};
