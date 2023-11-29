import { FC } from "react";

import { Header } from "@/components/header";
import { BookListForm } from "@/components/book-list/form/book-list-form";
import { ReturnBreadcrumb } from "@/components/return-breadcrumb";

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
