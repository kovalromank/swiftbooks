import { FC } from "react";
import { Autocomplete } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import classes from "./book-dropdown.module.css";

export const BookDropdown: FC = () => {
  return (
    <div className={classes.container}>
      <Autocomplete
        placeholder="Add book"
        rightSection={<IconChevronDown />}
        variant="filled"
        data={[
          "The Psychology of Money - Morgan Housel",
          "How Innovation Works - Matt Ridley",
          "Company of One - Paul Jarvis",
        ]}
        className={classes.dropdown}
        size="md"
      />
    </div>
  );
};
