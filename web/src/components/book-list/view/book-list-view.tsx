"use client";

import { FC } from "react";
import { Grid, GridCol } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

import { Header } from "@/components/header";
import { BookCatalog } from "@/components/book/book-catalog";
import { Review } from "./review";
import { ReviewForm } from "@/components/book-list/view/review-form";
import { useBookList, useBookListBooks, useBookListPageCount, useBookListReviews } from "@/api/api";
import { Infos } from "@/components/infos";

import classes from "./book-list-view.module.css";

export interface BookListViewProps {
  id: number;
}

export const BookListView: FC<BookListViewProps> = ({ id }) => {
  const { data: bookList } = useBookList(id);
  const { data: books } = useBookListBooks(id);
  const { data: pages } = useBookListPageCount(id);
  const { data: reviews } = useBookListReviews(id);

  const visibleReviews = (reviews || []).filter((review) => !review.hidden);

  useDocumentTitle(bookList ? `${bookList.list_name} | Swift Books` : "");

  if (!bookList) {
    return null;
  }

  return (
    <>
      <Header noMargin>{bookList.list_name}</Header>
      <div className={classes.creator}>{bookList.created_by_username}</div>

      <Infos
        infos={[
          { id: "books", label: "Books", value: books?.length },
          { id: "pages", label: "Pages", value: pages, type: "number" },
          { id: "created", label: "Created at", value: bookList.created_at, type: "datetime" },
          { id: "updated", label: "Updated on", value: bookList.updated_at, type: "datetime" },
        ]}
      />

      <div className={classes.description}>{bookList.description}</div>
      <Header order={2}>Books in this list</Header>
      <div className={classes.bookListContainer}>{books ? <BookCatalog data={books} /> : null}</div>
      <Header order={2}>Reviews</Header>
      <Grid gutter="1.25rem" className={classes.reviewContainer}>
        {visibleReviews.length ? (
          visibleReviews.map((review) => (
            <GridCol key={review.id} span={{ base: 12, lg: 6 }}>
              <Review data={review} />
            </GridCol>
          ))
        ) : (
          <GridCol>
            <div className={classes.empty}>No reviews found for this book list</div>
          </GridCol>
        )}
      </Grid>
      <Header order={2}>Leave a review</Header>
      <ReviewForm />
    </>
  );
};
