import { FC } from "react";
import { Anchor } from "@mantine/core";
import Link from "next/link";
import cx from "clsx";
import { usePathname } from "next/navigation";

import classes from "./header-links.module.css";

export const HeaderLinks: FC = () => {
  const pathname = usePathname();

  return (
    <div className={classes.linkContainer}>
      <Anchor
        component={Link}
        className={cx(classes.link, { [classes.active]: pathname === "/books" })}
        href="/books"
      >
        Books
      </Anchor>
      <div className={classes.separator}></div>
      <Anchor
        component={Link}
        className={cx(classes.link, { [classes.active]: pathname === "/book-lists" })}
        href="/book-lists"
      >
        Book lists
      </Anchor>
      <div className={classes.separator}></div>
      <Anchor
        component={Link}
        className={cx(classes.link, { [classes.active]: pathname === "/users" })}
        href="/users"
      >
        Admin
      </Anchor>
    </div>
  );
};
