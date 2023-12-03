import { FC, FormEvent, ReactNode } from "react";
import { Button, Card } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

import { Header } from "@/components/header";
import { Hr } from "@/components/hr";

import classes from "./login.module.css";

export interface AuthBoxProps {
  variant?: "login" | "register";
  children?: ReactNode;
  loading?: boolean;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onReset?: (event: FormEvent<HTMLFormElement>) => void;
}

export const AuthBox: FC<AuthBoxProps> = ({
  variant = "login",
  loading,
  children,
  onSubmit,
  onReset,
}) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder className={classes.container}>
      <Header>{variant === "register" ? "Register" : "Login"}</Header>
      <form className={classes.sectionContainer} onSubmit={onSubmit} onReset={onReset}>
        <div className={classes.inputContainer}>{children}</div>
        <Button type="submit" variant="filled" loading={loading}>
          {variant === "register" ? "REGISTER" : "LOGIN"}
        </Button>
        <Hr />
        <Button
          variant="outline"
          color="black"
          leftSection={<IconBrandGoogleFilled />}
          classNames={{ root: classes.googleButton, inner: classes.googleButtonInner }}
        >
          Continue with Google
        </Button>
      </form>
    </Card>
  );
};
