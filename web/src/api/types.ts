export interface ApiBook {
  id: string;
  title: string | null;
  subtitle: string | null;
  authors: string[] | null;
  publisher: string | null;
  published_date: string | null;
  description: string | null;
  numPages: number | null;
  categories: string[] | null;
  averageStars: number | null;
  mature: "MATURE" | "NOT_MATURE" | null;
  thumbnail: string | null;
  saleability: "FOR_SALE" | "FREE" | "NOT_FOR_SALE" | "FOR_PREORDER" | null;
  price: number | null;
  sale_price: number | null;
}

export interface ApiSearchBook extends ApiBook {
  index: number;
}

export interface ApiInfoBook extends ApiBook {
  fullImage: string | null;
}

export interface ApiSearchBookInput {
  author?: string;
  field?: string;
  title?: string;
  offset?: number;
  limit?: number;
}