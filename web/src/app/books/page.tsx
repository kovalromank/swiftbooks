import { FC } from "react";
import { Metadata } from "next";

import { Header } from "@/components/header";
import { BookList } from "@/components/book/book-list";
import { BookFilter } from "@/components/book/book-filter";

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: "Book catalog | Swift Books",
};

const Books: FC = () => {
  return (
    <>
      <Header>Browse our catalog of books</Header>
      <div className={classes.filterContainer}>
        <BookFilter />
      </div>
      <BookList />
    </>
  );
};

export default Books;
