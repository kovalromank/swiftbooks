"use client";

import { FC, useState } from "react";
import { ActionIcon, Popover, PopoverTarget, PopoverDropdown } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";

import { Cart } from "./cart";

import classes from "./cart-menu.module.css";

export const CartMenu: FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      shadow="sm"
      radius="md"
      position="bottom-end"
      trapFocus
      classNames={{ dropdown: classes.dropdown }}
      opened={opened}
      onChange={setOpened}
    >
      <PopoverTarget>
        <ActionIcon size="2.5rem" variant="subtle" color="black" onClick={() => setOpened(!opened)}>
          <IconShoppingBag size="2.5rem" />
        </ActionIcon>
      </PopoverTarget>
      <PopoverDropdown>
        <Cart onClose={() => setOpened(false)} />
      </PopoverDropdown>
    </Popover>
  );
};
