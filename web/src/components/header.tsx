import { FC, ReactNode } from "react";
import { Title } from "@mantine/core";

import classes from "./header.module.css";

export interface HeaderProps {
  order?: 1 | 2;
  children: ReactNode;
}

export const Header: FC<HeaderProps> = ({ order = 1, children }) => {
  return (
    <Title order={order} className={order === 1 ? classes.header : classes.header2}>
      {children}
    </Title>
  );
};
