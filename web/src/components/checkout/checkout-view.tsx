import { FC } from "react";
import { Grid, GridCol } from "@mantine/core";

import { Form } from "./form";
import { Summary } from "./summary";

export const CheckoutView: FC = () => {
  return (
    <Grid gutter="3.75rem">
      <GridCol span={{ base: 12, sm: 8, md: 6, xl: 4 }} order={{ base: 2, md: 1 }}>
        <Form />
      </GridCol>
      <GridCol span={{ base: 12, sm: 8, md: 6, xl: 4 }} order={{ base: 1, md: 2 }}>
        <Summary />
      </GridCol>
    </Grid>
  );
};
