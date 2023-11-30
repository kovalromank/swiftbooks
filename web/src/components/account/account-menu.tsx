import { FC } from "react";
import { Popover, ActionIcon, PopoverTarget, PopoverDropdown, Button } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

import { Hr } from "@/components/hr";

import classes from "./account-menu.module.css";

export const AccountMenu: FC = () => {
  return (
    <>
      <Popover shadow="sm" radius="md" position="bottom-end" trapFocus returnFocus>
        <PopoverTarget>
          <ActionIcon size="2.5rem" variant="subtle" color="black">
            <IconUser size="2.5rem" />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown className={classes.dropdown}>
          <div className={classes.container}>
            <div>
              <div className={classes.name}>Stacy Bob</div>
              <div className={classes.email}>stacyb@acme.com</div>
            </div>
            <Hr />
            <Button variant="light" color="violet">
              LOGOUT
            </Button>
          </div>
        </PopoverDropdown>
      </Popover>
    </>
  );
};
