import { FC } from "react";

import { Hr } from "@/components/hr";
import { BookSmall } from "@/components/book/book-small";

import classes from "./summary.module.css";

export const Summary: FC = () => {
  return (
    <div>
      <div className={classes.header}>Summary</div>
      <div className={classes.rowContainer}>
        <div className={classes.row}>
          <div>Total cost</div>
          <div>$99.96</div>
        </div>
        <div className={classes.row}>
          <div>Shipping</div>
          <div className={classes.free}>FREE</div>
        </div>
        <Hr />
        <div className={classes.row}>
          <div>Total</div>
          <div>$99.96</div>
        </div>
        <Hr />
        <BookSmall variant="cart" />
        <BookSmall variant="cart" />
      </div>
    </div>
  );
};
