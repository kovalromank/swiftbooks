"use client";

import { FC, ReactNode, useMemo } from "react";
import DOMPurify from "dompurify";
import { Alert, Button } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

import { useBook } from "@/api/api";
import { ApiInfoBook } from "@/api/types";
import { Header } from "@/components/header";

import classes from "./book-view.module.css";

interface DescriptionProps {
  content: string;
}

const Description: FC<DescriptionProps> = ({ content }) => {
  const html = useMemo(() => DOMPurify.sanitize(content), [content]);
  return <div className={classes.description} dangerouslySetInnerHTML={{ __html: html }}></div>;
};

interface Info {
  get(data: ApiInfoBook): ReactNode;

  label: ReactNode;
}

const infos: Info[] = [
  { label: "Publisher", get: (data) => data.publisher },
  { label: "Published", get: (data) => data.published_date },
  { label: "Pages", get: (data) => data.numPages },
  { label: "Categories", get: (data) => data.categories?.join(", ") },
];

export interface BookViewProps {
  id: string;
}

export const BookView: FC<BookViewProps> = ({ id }) => {
  const { data, isLoading, isSuccess } = useBook(id);

  if (!isLoading && !isSuccess) {
    return (
      <Alert color="orange" title="Book not found" icon={<IconExclamationCircle />} maw="24rem" />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.detailsRow}>
        <div className={classes.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width="300"
            height="300"
            src={data.fullImage || data.thumbnail!}
            alt="Book cover"
            className={classes.image}
          />
        </div>
        <div className={classes.detailsSections}>
          <div>
            {data.title ? <Header noMargin>The Psychology of Money</Header> : null}
            {data.authors?.length ? (
              <div className={classes.author}>{data.authors.join(",")}</div>
            ) : null}
          </div>
          <div className={classes.infoContainer}>
            {infos.map((info, i) => {
              const row = info.get(data);
              if (row == null) {
                return null;
              }

              return (
                <div key={i} className={classes.info}>
                  <span>{info.label}:</span>
                  <span>{row}</span>
                </div>
              );
            })}
          </div>
          {data.price != null ? <div className={classes.price}>$24.99</div> : null}
          <div>
            <Button variant="light" color="violet">
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.descriptionContainer}>
        {data.subtitle ? <div className={classes.description}>{data.subtitle}</div> : null}
        {data.description ? <Description content={data.description} /> : null}
      </div>
    </div>
  );
};
