"use client";

import { FC, useCallback } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { useFormik } from "formik";

import { ApiSearchBookInput } from "@/api/types";
import { subjects } from "./subjects";

import classes from "./book-filter.module.css";

export interface BookFilterProps {
  loading?: boolean;
  onSubmit?: (input: ApiSearchBookInput) => void;
}

export const BookFilter: FC<BookFilterProps> = ({ loading, onSubmit }) => {
  const formik = useFormik({
    initialValues: { title: "", author: "", field: "" },
    onSubmit(values) {
      onSubmit?.(values);
    },
  });

  const onSubjectChange = useCallback(
    (subject: string | null) => {
      formik.setFieldValue("field", subject ?? "");
    },
    [formik],
  );

  return (
    <form className={classes.container} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <TextInput
        placeholder="Title"
        name="title"
        variant="filled"
        size="md"
        className={classes.input}
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextInput
        placeholder="Author"
        name="author"
        variant="filled"
        size="md"
        className={classes.input}
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Select
        placeholder="Subject"
        variant="filled"
        name="field"
        size="md"
        data={subjects}
        searchable
        clearable
        value={formik.values.field}
        onChange={onSubjectChange}
        onBlur={formik.handleBlur}
      />
      <Button variant="filled" size="md" type="submit" loading={loading}>
        FILTER
      </Button>
    </form>
  );
};
