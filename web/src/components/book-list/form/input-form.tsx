import { FC } from "react";
import { Button, Checkbox, Textarea, TextInput } from "@mantine/core";

import classes from "./input-form.module.css";

export const InputForm: FC = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={classes.container}>
      <div>
        <TextInput placeholder="Book list name *" variant="filled" size="md" />
      </div>
      <div>
        <Textarea placeholder="Book list description" variant="filled" size="md" rows={5} />
      </div>
      <div className={classes.createRowContainer}>
        <div className={classes.checkboxContainer}>
          <Checkbox
            label="Public"
            labelPosition="left"
            size="md"
            classNames={{ label: classes.createButtonLabel }}
          />
        </div>
        <div className={classes.createButtonContainer}>
          <Button variant="filled" type="submit" size="md">
            CREATE
          </Button>
        </div>
      </div>
    </form>
  );
};
