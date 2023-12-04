import { FC, FormEvent, ReactNode } from "react";
import { Alert, Anchor, Button, Card } from "@mantine/core";
import { IconArrowRight, IconBrandGoogleFilled, IconExclamationCircle } from "@tabler/icons-react";

import { Header } from "@/components/header";
import { Hr } from "@/components/hr";

import classes from "./login.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export interface AuthBoxProps {
  variant?: "login" | "register";
  children?: ReactNode;
  loading?: boolean;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onReset?: (event: FormEvent<HTMLFormElement>) => void;
  error?: string;
}

export const AuthBox: FC<AuthBoxProps> = ({
  variant = "login",
  loading,
  children,
  onSubmit,
  onReset,
  error,
}) => {
  const params = useSearchParams();

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder className={classes.container}>
      <Header>{variant === "register" ? "Register" : "Login"}</Header>
      <form className={classes.sectionContainer} onSubmit={onSubmit} onReset={onReset}>
        <div className={classes.inputContainer}>{children}</div>
        {error ? (
          <Alert p="0.5rem" icon={<IconExclamationCircle />} color="red" title={error}></Alert>
        ) : null}
        <Button type="submit" variant="filled" loading={loading}>
          {variant === "register" ? "REGISTER" : "LOGIN"}
        </Button>
        {variant === "login" ? (
          <Anchor
            component={Link}
            c="violet"
            href={`/register${params.size ? "?" + params.toString() : ""}`}
            replace
            className={classes.register}
          >
            Create an account <IconArrowRight size="1.25rem" />
          </Anchor>
        ) : (
          <Anchor
            component={Link}
            c="violet"
            href={`/login${params.size ? "?" + params.toString() : ""}`}
            replace
            className={classes.register}
          >
            Already have an account?
          </Anchor>
        )}
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
