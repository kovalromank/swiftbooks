import { FC, useState } from "react";
import {
  Popover,
  ActionIcon,
  PopoverTarget,
  PopoverDropdown,
  Button,
  CloseButton,
  ActionIconProps,
  Title,
} from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

import { Hr } from "@/components/hr";

import classes from "./account-menu.module.css";

export const AccountMenu: FC<ActionIconProps> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Popover
        shadow="sm"
        radius="md"
        position="bottom-end"
        trapFocus
        returnFocus
        opened={opened}
        onChange={setOpened}
      >
        <PopoverTarget>
          <ActionIcon
            size="2.5rem"
            variant="subtle"
            color="black"
            onClick={() => setOpened(!opened)}
            {...props}
          >
            <IconUser size="2.5rem" />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown className={classes.dropdown}>
          <div className={classes.container}>
            <div>
              <div className={classes.nameRow}>
                <Title order={3} className={classes.name}>
                  Stacy Bob
                </Title>
                <CloseButton onClick={() => setOpened(false)} />
              </div>
              <div className={classes.email}>stacyb@acme.com</div>
            </div>
            <Hr />
            <Button variant="light" color="violet" data-autofocus onClick={() => setOpened(false)}>
              LOGOUT
            </Button>
          </div>
        </PopoverDropdown>
      </Popover>
    </>
  );
};
