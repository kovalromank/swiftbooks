"use client";

import { FC } from "react";
import { Button, Grid, GridCol, Rating, Textarea } from "@mantine/core";

import classes from "./review-form.module.css";

export const ReviewForm: FC = () => {
  return (
    <Grid className={classes.container}>
      <GridCol span={{ base: 12, md: 8, lg: 6 }}>
        <form onSubmit={(e) => e.preventDefault()} className={classes.container}>
          <div>
            <Textarea placeholder="Add a review" variant="filled" size="md" rows={5} />
          </div>
          <div className={classes.createRowContainer}>
            <Rating count={5} size="xl" />
            <Button variant="filled" className={classes.createButton}>
              CREATE
            </Button>
          </div>
        </form>
      </GridCol>
    </Grid>
  );
};
