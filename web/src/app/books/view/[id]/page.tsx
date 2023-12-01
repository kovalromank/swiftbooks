import { FC } from "react";
import { Metadata } from "next";

import { ReturnBreadcrumb } from "@/components/return-breadcrumb";
import { BookView } from "@/components/book/book-view";

export const generateMetadata = ({ params }: BooksViewPageProps): Metadata => {
  return {
    title: `${params.id} | Swift Books`,
  };
};

interface BooksViewPageProps {
  params: { id: string };
}

const BooksViewPage: FC<BooksViewPageProps> = ({ params }) => {
  return (
    <>
      <ReturnBreadcrumb href="/books">Books</ReturnBreadcrumb>
      <BookView id={params.id} />
    </>
  );
};

export default BooksViewPage;
