"use client";

import { FC } from "react";
import { PasswordInput, TextInput } from "@mantine/core";

import { AuthBox } from "@/components/auth/auth-box";

export const Register: FC = ({}) => {
  return (
    <AuthBox variant="register">
      <TextInput placeholder="First name" variant="filled" size="md" />
      <TextInput placeholder="Last name" variant="filled" size="md" />
      <TextInput placeholder="Username" variant="filled" size="md" />
      <PasswordInput placeholder="Password" variant="filled" size="md" />
    </AuthBox>
  );
};
