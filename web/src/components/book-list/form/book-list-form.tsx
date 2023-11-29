"use client";

import { FC } from "react";

import { Header } from "@/components/header";
import { BookSmall } from "@/components/book/book-small";
import { InputForm } from "./input-form";
import { BookDropdown } from "./book-dropdown";

import classes from "./book-list-form.module.css";

export const BookListForm: FC = () => {
  return (
    <>
      <InputForm />
      <Header order={2}>Books in this list</Header>
      <BookDropdown />
      <div className={classes.bookList}>
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <BookSmall key={i} />
          ))}
      </div>
    </>
  );
};
