"use client";

import { FC, useMemo } from "react";
import DOMPurify from "dompurify";
import { Alert, Badge, Button } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useDocumentTitle } from "@mantine/hooks";

import { useBook } from "@/api/api";
import { Header } from "@/components/header";
import { Infos } from "@/components/infos";

import classes from "./book-view.module.css";

interface DescriptionProps {
  content: string;
}

const Description: FC<DescriptionProps> = ({ content }) => {
  const html = useMemo(() => DOMPurify.sanitize(content), [content]);
  return <div className={classes.description} dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export interface BookViewProps {
  id: string;
}

export const BookView: FC<BookViewProps> = ({ id }) => {
  const { data, isLoading, isSuccess } = useBook(id);

  const format = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }),
    [],
  );

  useDocumentTitle(data?.title ? `${data.title} | Swift Books` : "");

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
            {data.title ? <Header noMargin>{data.title}</Header> : null}
            {data.authors?.length ? (
              <div className={classes.author}>{data.authors.join(",")}</div>
            ) : null}
          </div>

          <Infos
            infos={[
              { id: "publisher", label: "Publisher", value: data.publisher },
              { id: "published", label: "Published", value: data.published_date },
              { id: "pages", label: "Pages", value: data.numPages },
              {
                id: "categories",
                label: "Categories",
                type: "tags",
                value: (data.categories || []).slice(0, 3).map((category) => (
                  <Badge key={category} variant="light" color="violet" size="sm" radius="xs">
                    {category}
                  </Badge>
                )),
              },
            ]}
          />

          {data.price != null ? (
            <div className={classes.price}>{format.format(data.price)}</div>
          ) : null}
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
