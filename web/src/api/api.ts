import { keepPreviousData, QueryClient, useQuery } from "@tanstack/react-query";

import { ApiSearchBook, ApiSearchBookInput } from "./types";

export const client = new QueryClient();

export const useBookSearch = ({ title, author, field }: ApiSearchBookInput) => {
  return useQuery<ApiSearchBook[]>({
    placeholderData: keepPreviousData,
    queryKey: ["bookSearch", title, author, field],
    queryFn: async () => {
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

      const res = await fetch(`http://localhost:3001/api/open/search?${query}`, {
        method: "GET",
      });

      return await res.json();
    },
  });
};
