import {
  keepPreviousData,
  QueryClient,
  useMutation,
  useQueries,
  useQuery,
} from "@tanstack/react-query";

import {
  ApiAddCartBookInput,
  ApiBookId,
  ApiBookList,
  ApiCartItem,
  ApiCheckout,
  ApiCheckoutInput,
  ApiInfoBook,
  ApiLogin,
  ApiLoginInput,
  ApiRegister,
  ApiRegisterInput,
  ApiRemoveCartBookInput,
  ApiReview,
  ApiSearchBook,
  ApiSearchBookInput,
  ApiUser,
} from "./types";

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

const tokenKey = "com.swiftbooks.token";

export const getToken = () => window.localStorage.getItem(tokenKey);

export const setToken = (token: string) => window.localStorage.setItem(tokenKey, token);

export const removeToken = () => window.localStorage.removeItem(tokenKey);

const getHeaders = (): Record<string, string> => {
  const token = getToken();

  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
};

const doPost = <T>(input: RequestInfo, { headers, ...rest }: RequestInit = {}): Promise<T> =>
  doFetch(input, { headers: { "content-type": "application/json", ...headers }, ...rest });

const doFetch = <T>(input: RequestInfo, { headers, ...rest }: RequestInit = {}): Promise<T> =>
  fetch(input, { headers: { ...getHeaders(), ...headers }, ...rest }).then(async (res) => {
    if (!res.ok) {
      let data;
      try {
        data = await res.json();
      } catch (error) {}

      throw new ServerError(data);
    }

    return res.json();
  });

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (input: ApiLoginInput) =>
      doPost<ApiLogin>("http://localhost:3001/api/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: async (_data, _input) => {
      await client.resetQueries({ queryKey: ["currentUser"] });
      await client.resetQueries({ queryKey: ["cart"] });
    },
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: (input: ApiRegisterInput) =>
      doPost<ApiRegister>("http://localhost:3001/api/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: async (_data, _input) => {
      await client.resetQueries({ queryKey: ["currentUser"] });
      await client.resetQueries({ queryKey: ["cart"] });
    },
  });

export const useRemoveCartBookMutation = () =>
  useMutation({
    mutationFn: (input: ApiRemoveCartBookInput) =>
      doPost<ApiRegister>("http://localhost:3001/api/secure/delete-book-from-cart", {
        method: "DELETE",
        body: JSON.stringify(input),
      }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["cart"] });
    },
  });

export const useAddCartBookMutation = () =>
  useMutation({
    mutationFn: (input: ApiAddCartBookInput) =>
      doPost<ApiRegister>("http://localhost:3001/api/secure/add-book-to-cart", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["cart"] });
    },
  });

export const useCheckoutMutation = () =>
  useMutation({
    mutationKey: ["checkout"],
    mutationFn: (input: ApiCheckoutInput) =>
      doPost<ApiCheckout>("http://localhost:3001/api/secure/checkout", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["cart"] });
    },
  });

export const useCart = (enabled?: boolean) =>
  useQuery<ApiCartItem[]>({
    retry: false,
    enabled,
    queryKey: ["cart"],
    queryFn: () => doFetch(`http://localhost:3001/api/secure/get-cart`),
  });

export const useCartBooks = (
  enabled?: boolean,
): { data: undefined; isSuccess: false } | { data: ApiInfoBook[]; isSuccess: true } => {
  const { data: cartItems } = useCart(enabled);
  const responses = useQueries({
    queries:
      enabled !== false
        ? cartItems
          ? cartItems.map(({ book_id }) => getBookQueryOptions(book_id))
          : []
        : [],
  });

  if (!cartItems || responses.some((response) => !response.data)) {
    return { data: undefined, isSuccess: false };
  }

  return {
    data: responses.map((response) => response.data!),
    isSuccess: true,
  };
};

export const useCartTotal = (enabled?: boolean): { data: number | undefined } => {
  const { data: cartItems } = useCart(enabled);
  const { data: books } = useCartBooks(enabled);

  if (!books || !cartItems) {
    return { data: undefined };
  }

  const total =
    books
      ?.filter((book) => book.price != null)
      .reduce(
        (acc, book) =>
          acc +
          (book.price ?? 0) * (cartItems?.find((item) => item.book_id === book.id)?.quantity ?? 0),
        0,
      ) || 0;

  return { data: total };
};

export const useUsers = () =>
  useQuery<ApiUser[]>({
    retry: false,
    queryKey: ["users"],
    queryFn: () => doFetch(`http://localhost:3001/api/admin/get-users`),
  });

export const useCurrentUser = (enabled?: boolean) =>
  useQuery<ApiUser>({
    retry: false,
    queryKey: ["currentUser"],
    queryFn: () => doFetch(`http://localhost:3001/api/secure/get-user-details`),
    enabled,
  });

export const useBookListReviews = (id: number) =>
  useQuery<ApiReview[]>({
    retry: false,
    queryKey: ["bookListReviews", id],
    queryFn: () => doFetch(`http://localhost:3001/api/open/get-reviews-for-list?list_id=${id}`),
  });

export const useBookListBooks = (id: number): { data: ApiInfoBook[] | undefined } => {
  const { data: bookIds } = useBookListBookIds(id);
  const responses = useQueries({
    queries: bookIds ? bookIds.map(({ id }) => getBookQueryOptions(id)) : [],
  });

  if (!bookIds || responses.some((response) => !response.data)) {
    return { data: undefined };
  }

  return { data: responses.map((response) => response.data!) };
};

export const useBookList = (id: number) =>
  useQuery<ApiBookList>({
    retry: false,
    queryKey: ["bookList", id],
    queryFn: () => doFetch(`http://localhost:3001/api/open/booklist-info-from-id?list_id=${id}`),
  });

export const useBookListBookIds = (id: number) =>
  useQuery<ApiBookId[]>({
    retry: false,
    queryKey: ["bookListBookIds", id],
    queryFn: () => doFetch(`http://localhost:3001/api/open/list-book-ids?list_id=${id}`),
  });

export const useBookListPageCount = (id: number): { data: number | undefined } => {
  const { data: books } = useBookListBooks(id);

  if (!books) {
    return { data: undefined };
  }

  const pages = books.reduce((acc, book) => (book.numPages || 0) + acc, 0);

  return { data: pages };
};

export const useUserBookLists = (enabled?: boolean) =>
  useQuery<ApiBookList[]>({
    retry: false,
    enabled,
    queryKey: ["userBookLists"],
    queryFn: () => doFetch("http://localhost:3001/api/secure/get-user-booklists"),
  });

export const useRecentBookLists = (enabled?: boolean) =>
  useQuery<ApiBookList[]>({
    retry: false,
    enabled,
    queryKey: ["recentBookLists"],
    queryFn: () => doFetch("http://localhost:3001/api/open/recent-public-booklists"),
  });

const getBookQueryOptions = (id: string) =>
  ({
    retry: false,
    queryKey: ["book", id],
    queryFn: () =>
      doFetch<ApiInfoBook>(`http://localhost:3001/api/open/book-info-from-id?id=${id}`),
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
  }) as const;

export const useBook = (id: string) => useQuery<ApiInfoBook>(getBookQueryOptions(id));

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
