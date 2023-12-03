"use client";

import { FC, useState, MouseEvent, useCallback } from "react";
import { ActionIcon, ActionIconProps, Indicator, Modal, useMantineTheme } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

import { Cart } from "./cart";

import classes from "./cart-menu.module.css";

export const CartMenu: FC<ActionIconProps> = ({ size, ...rest }) => {
  const [opened, setOpened] = useState(false);
  const [offset, setOffset] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined });

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, false);

  const onCartClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
    setOffset({ x: window.innerWidth - (x + width), y: y + height });
    setOpened(true);
  }, []);

  return (
    <>
      <Indicator
        label={3}
        size="1rem"
        offset={3}
        color="violet"
        variant="light"
        className={classes.indicator}
      >
        <ActionIcon
          size={size || "2.5rem"}
          variant="subtle"
          color="black"
          onClick={onCartClick}
          {...rest}
        >
          <IconShoppingBag size="2.5rem" />
        </ActionIcon>
      </Indicator>
      <Modal
        padding="1.25rem"
        trapFocus
        title={<span className={classes.header}>Your shopping cart</span>}
        opened={opened}
        onClose={() => setOpened(false)}
        xOffset={offset.x}
        yOffset={offset.y}
        fullScreen={isMobile}
        classNames={{ inner: !isMobile ? classes.modalInner : undefined }}
      >
        <Cart onClose={() => setOpened(false)} />
      </Modal>
    </>
  );
};
