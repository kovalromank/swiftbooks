import { FC, ReactNode } from "react";
import { Title } from "@mantine/core";
import cx from "clsx";

import classes from "./header.module.css";

export interface HeaderProps {
  order?: 1 | 2;
  noMargin?: boolean;
  children: ReactNode;
}

export const Header: FC<HeaderProps> = ({ order = 1, noMargin = false, children }) => {
  return (
    <Title
      order={order}
      className={cx({
        [classes.header]: order === 1,
        [classes.header2]: order === 2,
        [classes.margin]: !noMargin,
      })}
    >
      {children}
    </Title>
  );
};
