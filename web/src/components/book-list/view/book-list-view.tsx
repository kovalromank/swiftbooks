import { FC } from "react";

import { Header } from "@/components/header";
import { BookCatalog } from "@/components/book/book-catalog";
import { Review } from "./review";

import classes from "./book-list-view.module.css";
import { Grid, GridCol } from "@mantine/core";
import { ReviewForm } from "@/components/book-list/view/review-form";

export const BookListView: FC = () => {
  return (
    <>
      <Header noMargin>Great Reads 1</Header>
      <div className={classes.creator}>Stacy Bob</div>
      <div className={classes.details}>Created: Dec. 1st, 2023 at 2:00:23 pm</div>
      <div className={classes.details}>Updated: Dec. 3rd, 2023 at 5:43:01 pm</div>
      <div className={classes.description}>A collection of my favorite books to read</div>
      <Header order={2}>Books in this list</Header>
      <div className={classes.bookListContainer}>
        <BookCatalog n={3} />
      </div>
      <Header order={2}>Reviews</Header>
      <Grid gutter="1.25rem" className={classes.reviewContainer}>
        <GridCol span={{ base: 12, lg: 6 }}>
          <Review />
        </GridCol>
        <GridCol span={{ base: 12, lg: 6 }}>
          <Review />
        </GridCol>
        <GridCol span={{ base: 12, lg: 6 }}>
          <Review />
        </GridCol>
        <GridCol span={{ base: 12, lg: 6 }}>
          <Review />
        </GridCol>
      </Grid>
      <Header order={2}>Leave a review</Header>
      <ReviewForm />
    </>
  );
};
