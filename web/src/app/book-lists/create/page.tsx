import { FC } from "react";
import { Metadata } from "next";

import { Header } from "@/components/header";
import { BookListForm } from "@/components/book-list/form/book-list-form";
import { ReturnBreadcrumb } from "@/components/return-breadcrumb";

export const metadata: Metadata = {
  title: "Create book list | Swift Books",
};

const BookListsCreate: FC = () => {
  return (
    <>
      <ReturnBreadcrumb href="/book-lists">Book lists</ReturnBreadcrumb>
      <Header>Create a book list</Header>
      <BookListForm />
    </>
  );
};

export default BookListsCreate;
