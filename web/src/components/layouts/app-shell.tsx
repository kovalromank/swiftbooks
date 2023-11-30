"use client";

import { FC, ReactNode } from "react";
import { AppShell, Title } from "@mantine/core";
import Image from "next/image";

import { CartMenu } from "@/components/cart/cart-menu";
import { AccountMenu } from "@/components/account/account-menu";
import { HeaderLinks } from "@/components/layouts/header-links";

import logo from "@/images/logo.png";

import classes from "./app-shell.module.css";

export const AppShellLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header className={classes.header}>
        <div className={classes.headerInner}>
          <div className={classes.headerBranding}>
            <Image src={logo} alt="Swift Books logo" width={40} height={40} />
            <Title order={3} className={classes.title}>
              Swift <span>Books</span>
            </Title>
          </div>

          <HeaderLinks />

          <div className={classes.headerActions}>
            <CartMenu />

            <AccountMenu />
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.container}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};
