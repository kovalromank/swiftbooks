"use client";

import { FC } from "react";
import { Button, Card, PasswordInput, TextInput } from "@mantine/core";

import { Header } from "@/components/header";

import classes from "./login.module.css";
import { Hr } from "@/components/hr";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

export const Login: FC = () => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder className={classes.container}>
      <Header>Login</Header>
      <form className={classes.sectionContainer} onSubmit={(e) => e.preventDefault()}>
        <div className={classes.inputContainer}>
          <TextInput placeholder="Username" variant="filled" size="md" />
          <PasswordInput placeholder="Password" variant="filled" size="md" />
        </div>
        <Button type="submit" variant="filled">
          LOGIN
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
