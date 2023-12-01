import { keepPreviousData, QueryClient, useQuery } from "@tanstack/react-query";

import { ApiBookId, ApiBookList, ApiInfoBook, ApiSearchBook, ApiSearchBookInput } from "./types";

export const client = new QueryClient();

class ServerError extends Error {
  name = "ServerError";

  constructor(object: unknown) {
    let message = "Server error";

    if (typeof object === "object") {
      if ((object as any)?.message) {
        message = (object as any).message;
      }
    }

    super(message);
  }
}

const doFetch = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then(async (res) => {
    if (!res.ok) {
      let data;
      try {
        data = await res.json();
      } catch (error) {}

      throw new ServerError(data);
    }

    return res.json();
  });

export const useBookListBookIds = (id: number) =>
  useQuery<ApiBookId[]>({
    retry: false,
    queryKey: ["bookListBookIds", id],
    queryFn: () => doFetch(`http://localhost:3001/api/open/list-book-ids?list_id=${id}`),
  });

export const useRecentBookLists = () =>
  useQuery<ApiBookList[]>({
    retry: false,
    queryKey: ["recentBookLists"],
    queryFn: () => doFetch("http://localhost:3001/api/open/recent-public-booklists"),
  });

export const useBook = (id: string) =>
  useQuery<ApiInfoBook>({
    retry: false,
    queryKey: ["book", id],
    queryFn: () => doFetch(`http://localhost:3001/api/open/book-info-from-id?id=${id}`),
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
  });

export const useBookSearch = ({ title, author, field }: ApiSearchBookInput) =>
  useQuery<ApiSearchBook[]>({
    retry: false,
    placeholderData: keepPreviousData,
    queryKey: ["bookSearch", title, author, field],
    queryFn: () => {
      const params = new URLSearchParams();

      if (title) {
        params.set("title", title);
      }

      if (author) {
        params.set("author", author);
      }

      if (field) {
        params.set("field", field);
      }

      const query = params.toString();

      return doFetch(`http://localhost:3001/api/open/search?${query}`);
    },
  });
