import { ApiBook, ApiInfoBook } from "@/api/types";

export const books: ApiInfoBook[] = [
  {
    authors: ["Bob"],
    averageStars: 4,
    categories: ["Fiction", "Science"],
    description: "Fiction book",
    id: "abc",
    mature: "NOT_MATURE",
    numPages: 400,
    price: 19.99,
    published_date: "2020-01-02",
    publisher: "ABC books",
    sale_price: null,
    saleability: "FOR_SALE",
    subtitle: "Fiction book",
    thumbnail: "https://example.com/book-1",
    fullImage: "https://example.com/full-book-1",
    title: "Best fiction book",
  },
  {
    authors: ["Alice"],
    averageStars: 4,
    categories: ["Fiction", "Science"],
    description: "Fiction book",
    id: "def",
    mature: "NOT_MATURE",
    numPages: 400,
    price: 29.99,
    published_date: "2020-01-02",
    publisher: "ABC books",
    sale_price: null,
    saleability: "FOR_SALE",
    subtitle: "Fiction book",
    thumbnail: "https://example.com/book-1",
    fullImage: "https://example.com/full-book-1",
    title: "Second best fiction book",
  },
  {
    authors: ["Jimmy"],
    averageStars: 4,
    categories: ["Fiction", "Science"],
    description: "Fiction book",
    id: "ghi",
    mature: "NOT_MATURE",
    numPages: 400,
    price: 39.99,
    published_date: "2020-01-02",
    publisher: "ABC books",
    sale_price: null,
    saleability: "FOR_SALE",
    subtitle: "Fiction book",
    thumbnail: "https://example.com/book-1",
    fullImage: "https://example.com/full-book-1",
    title: "Third best fiction book",
  },
];
