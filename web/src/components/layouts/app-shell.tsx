"use client";

import { FC, ReactNode } from "react";
import { ActionIcon, AppShell, Title } from "@mantine/core";
import Image from "next/image";
import { IconUser } from "@tabler/icons-react";

import { CartMenu } from "@/components/cart/cart-menu";

import logo from "@/images/logo.png";

import classes from "./app-shell.module.css";

export const AppShellLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header className={classes.header}>
        <Image src={logo} alt="Swift Books logo" width={40} height={40} />
        <Title order={3} className={classes.title}>
          Swift <span>Books</span>
        </Title>

        <div className={classes.spacer}></div>

        <CartMenu />

        <ActionIcon
          size="2.5rem"
          variant="subtle"
          color="black"
          className={classes.headerButtonLast}
        >
          <IconUser size="2.5rem" />
        </ActionIcon>
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.container}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};
