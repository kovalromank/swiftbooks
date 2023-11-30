import { FC } from "react";
import { Anchor, AppShell, Title } from "@mantine/core";
import Link from "next/link";
import { IconBook2, IconBooks, IconUsers } from "@tabler/icons-react";
import cx from "clsx";
import { usePathname } from "next/navigation";

import { Hr } from "@/components/hr";

import sharedClasses from "./shared.module.css";
import classes from "./navbar.module.css";

export const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <AppShell.Navbar hiddenFrom="sm" className={classes.container}>
      <Title order={3} className={sharedClasses.title}>
        Swift <span>Books</span>
      </Title>
      <div className={classes.items}>
        <Hr />
        <Anchor
          component={Link}
          href="/books"
          className={cx(sharedClasses.link, classes.link, {
            [sharedClasses.active]: pathname === "/books",
          })}
        >
          <IconBook2 /> Books
        </Anchor>
        <Anchor
          component={Link}
          href="/book-lists"
          className={cx(sharedClasses.link, classes.link, {
            [sharedClasses.active]: pathname === "/book-lists",
          })}
        >
          <IconBooks /> Book lists
        </Anchor>
        <Anchor
          component={Link}
          href="/users"
          className={cx(sharedClasses.link, classes.link, {
            [sharedClasses.active]: pathname === "/users",
          })}
        >
          <IconUsers /> Admin
        </Anchor>
      </div>
    </AppShell.Navbar>
  );
};
