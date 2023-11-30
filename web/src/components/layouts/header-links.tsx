import { FC, HTMLAttributes } from "react";
import { Anchor } from "@mantine/core";
import Link from "next/link";
import cx from "clsx";
import { usePathname } from "next/navigation";

import sharedClasses from "./shared.module.css";
import classes from "./header-links.module.css";

export const HeaderLinks: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  const pathname = usePathname();

  return (
    <div className={cx(classes.linkContainer, className)} {...rest}>
      <Anchor
        component={Link}
        className={cx(sharedClasses.link, { [sharedClasses.active]: pathname === "/books" })}
        href="/books"
      >
        Books
      </Anchor>
      <div className={classes.separator}></div>
      <Anchor
        component={Link}
        className={cx(sharedClasses.link, { [sharedClasses.active]: pathname === "/book-lists" })}
        href="/book-lists"
      >
        Book lists
      </Anchor>
      <div className={classes.separator}></div>
      <Anchor
        component={Link}
        className={cx(sharedClasses.link, { [sharedClasses.active]: pathname === "/users" })}
        href="/users"
      >
        Admin
      </Anchor>
    </div>
  );
};
