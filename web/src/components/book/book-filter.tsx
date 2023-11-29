import { FC } from "react";
import { Button, TextInput } from "@mantine/core";

import classes from "./book-filter.module.css";

export const BookFilter: FC = () => {
  return (
    <div className={classes.container}>
      <TextInput placeholder="Book title" variant="filled" size="md" className={classes.input} />
      <TextInput placeholder="Book author" variant="filled" size="md" className={classes.input} />
      <Button variant="filled" size="md">
        FILTER
      </Button>
    </div>
  );
};
