"use client";

import { FC } from "react";
import { Button, Grid, GridCol, TextInput } from "@mantine/core";

import classes from "./form.module.css";

export const Form: FC = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={classes.sectionContainer}>
        <Grid gutter="1.25rem">
          <GridCol className={classes.header}>Contact information</GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="First name" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Last name" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Email address" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Phone number" variant="filled" size="md" />
          </GridCol>
        </Grid>
        <Grid gutter="1.25rem">
          <GridCol className={classes.header}>Shipping address</GridCol>
          <GridCol>
            <TextInput placeholder="Address line 1" variant="filled" size="md" />
          </GridCol>
          <GridCol>
            <TextInput placeholder="Address line 2" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Country" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Province" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="City" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Postal code" variant="filled" size="md" />
          </GridCol>
        </Grid>
        <Grid gutter="1.25rem">
          <GridCol className={classes.header}>Credit card</GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Name on card" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Card number" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="Expiry date" variant="filled" size="md" />
          </GridCol>
          <GridCol span={{ base: 6 }}>
            <TextInput placeholder="CVC" variant="filled" size="md" />
          </GridCol>
        </Grid>
      </div>
      <div className={classes.submitContainer}>
        <Button variant="filled" type="submit" size="md">
          SUBMIT
        </Button>
      </div>
    </form>
  );
};
