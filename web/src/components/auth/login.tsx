"use client";

import { FC } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import * as yup from "yup";

import { AuthBox } from "@/components/auth/auth-box";
import { useLoginMutation } from "@/api/api";
import { useAuth } from "@/components/auth/auth-context";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const Login: FC = () => {
  const { mutate, isPending } = useLoginMutation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: { email: "user1@example.com", password: "password" },
    validationSchema,
    onSubmit(values) {
      mutate(
        { email: values.email, password: values.password },
        {
          onSuccess: (data) => {
            auth.login(data.token);
          },
        },
      );
    },
  });

  return (
    <AuthBox variant="login" loading={isPending} onSubmit={formik.handleSubmit}>
      <TextInput
        placeholder="Email"
        name="email"
        variant="filled"
        size="md"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
      />
      <PasswordInput
        placeholder="Password"
        name="password"
        variant="filled"
        size="md"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
      />
    </AuthBox>
  );
};
