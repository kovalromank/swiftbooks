import { FC, ReactNode } from "react";
import { Title } from "@mantine/core";

import classes from "./header.module.css";

export interface HeaderProps {
  children: ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <Title order={1} className={classes.header}>
      {children}
    </Title>
  );
};
