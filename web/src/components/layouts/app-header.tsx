import { FC } from "react";

import classes from "./app-header.module.css";
import { Burger, Title } from "@mantine/core";
import Image from "next/image";
import logo from "@/images/logo.png";
import { HeaderLinks } from "@/components/layouts/header-links";
import { CartMenu } from "@/components/cart/cart-menu";
import { AccountMenu } from "@/components/account/account-menu";
import { useDisclosure } from "@mantine/hooks";

export const AppHeader: FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

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
    </>
  );
};
