import { FC } from "react";
import { Metadata } from "next";
import { Button, TextInput } from "@mantine/core";

import { Header } from "@/components/header";
import { BookList } from "@/components/book/book-list";

export const metadata: Metadata = {
  title: "Book catalog | Swift Books",
};

const Books: FC = () => {
  return (
    <>
      <Header>Browse our catalog of books</Header>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "3.75rem" }}>
        <TextInput
          placeholder="Book title"
          variant="filled"
          size="md"
          style={{ minWidth: "11rem" }}
        />
        <TextInput
          placeholder="Book author"
          variant="filled"
          size="md"
          style={{ minWidth: "11rem" }}
        />
        <Button variant="filled" size="md">
          FILTER
        </Button>
      </div>
      <BookList />
    </>
  );
};

export default Books;
