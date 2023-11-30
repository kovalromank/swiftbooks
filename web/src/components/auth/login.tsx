"use client";

import { FC } from "react";
import { PasswordInput, TextInput } from "@mantine/core";

import { AuthBox } from "@/components/auth/auth-box";

export const Login: FC = ({}) => {
  return (
    <AuthBox variant="login">
      <TextInput placeholder="Username" variant="filled" size="md" />
      <PasswordInput placeholder="Password" variant="filled" size="md" />
    </AuthBox>
  );
};
