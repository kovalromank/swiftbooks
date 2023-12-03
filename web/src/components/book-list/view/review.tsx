import { FC, useMemo } from "react";
import { Card, Rating, Tooltip } from "@mantine/core";
import humanizeDuration from "humanize-duration";
import { DateTime } from "luxon";

import { ApiReview } from "@/api/types";

import classes from "./review.module.css";

interface ReviewProps {
  data: ApiReview;
}

export const Review: FC<ReviewProps> = ({ data }) => {
  const date = useMemo(() => {
    const dateTime = DateTime.fromISO(data.added_at);

    if (!dateTime.isValid) {
      return "";
    }

    const humanizer = humanizeDuration.humanizer({
      units: ["y", "d", "h", "m", "s"],
      largest: 1,
      round: true,
    });

    const formatted = humanizer(Math.abs(dateTime.diffNow("milliseconds").milliseconds));

    return (
      <Tooltip
        color="gray"
        position="bottom"
        inline
        label={dateTime.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
        className={classes.tooltip}
      >
        <span>{formatted + " ago"}</span>
      </Tooltip>
    );
  }, [data.added_at]);

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <div className={classes.headerContainer}>
        <div className={classes.creator}>{data.username}</div>
        <Rating value={data.stars} count={5} readOnly />
        <div className={classes.spacer}></div>
        <div className={classes.date}>{date}</div>
      </div>
      <div className={classes.content}>{data.content}</div>
    </Card>
  );
};
