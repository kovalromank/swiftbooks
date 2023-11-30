import { FC, Fragment, HTMLAttributes } from "react";
import { Anchor } from "@mantine/core";
import Link from "next/link";
import cx from "clsx";
import { usePathname } from "next/navigation";

import { links } from "./links";

import sharedClasses from "./shared.module.css";
import classes from "./header-links.module.css";

export const HeaderLinks: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  const pathname = usePathname();

  return (
    <div className={cx(classes.linkContainer, className)} {...rest}>
      {links.map(({ href, label }, i) => (
        <Fragment key={href}>
          {i ? <div className={classes.separator}></div> : null}
          <Anchor
            component={Link}
            className={cx(sharedClasses.link, { [sharedClasses.active]: pathname === href })}
            href={href}
          >
            {label}
          </Anchor>
        </Fragment>
      ))}
    </div>
  );
};
