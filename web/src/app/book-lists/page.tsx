import { FC } from "react";
import { Metadata } from "next";

import { Header } from "@/components/header";
import { BookList } from "@/components/book-list/book-list";
import { Hr } from "@/components/hr";

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: "Book lists | Swift Books",
};

const BookLists: FC = () => {
  return (
    <>
      <Header>Browse public book lists</Header>
      <div className={classes.listContainer}>
        <BookList />
        <Hr />
        <BookList />
        <Hr />
        <BookList />
        <Hr />
        <BookList />
        <Hr />
        <BookList />
      </div>
    </>
  );
};

export default BookLists;
