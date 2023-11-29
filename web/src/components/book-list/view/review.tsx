import { FC } from "react";
import { Card, Rating } from "@mantine/core";

import classes from "./review.module.css";

export const Review: FC = () => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <div className={classes.headerContainer}>
        <div className={classes.creator}>Sarah Mathews</div>
        <Rating value={5} readOnly />
        <div className={classes.spacer}></div>
        <div className={classes.date}>8 hours ago</div>
      </div>
      <div className={classes.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in
        hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices
        mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare
        leo, non suscipit magna interdum eu.
      </div>
    </Card>
  );
};
