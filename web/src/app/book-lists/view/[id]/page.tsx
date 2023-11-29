import { FC } from "react";
import { Metadata } from "next";

import { ReturnBreadcrumb } from "@/components/return-breadcrumb";
import { BookListView } from "@/components/book-list/view/book-list-view";

export const generateMetadata = ({ params }: BookListsViewProps): Metadata => {
  return {
    title: `${params.id} | Swift Books`,
  };
};

interface BookListsViewProps {
  params: { id: string };
}

const BookListsView: FC<BookListsViewProps> = ({ params }) => {
  return (
    <>
      <ReturnBreadcrumb href="/book-lists">Book lists</ReturnBreadcrumb>
      <BookListView />
    </>
  );
};

export default BookListsView;
