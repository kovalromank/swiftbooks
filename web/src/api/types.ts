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

export interface ApiBookList {
  id: number;
  list_name: string;
  description: string | null;
  is_public: boolean;
  created_by_id: number;
  created_by_username: string;
  created_at: string;
  updated_at: string;
}

export interface ApiBookId {
  id: string;
}

export interface ApiReview {
  id: number;
  booklist_id: number;
  user_id: number;
  added_at: string;
  updated_at: string;
  content: string;
  stars: number;
  hidden: boolean;
  username: string;
}

export interface ApiLoginInput {
  email: string;
  password: string;
}

export interface ApiLogin {
  message: string;
  token: string;
}

export interface ApiRegister {
  message: string;
  token: string;
}

export interface ApiRegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  active: boolean;
  status: "admin" | "manager" | "user";
  created_at: string;
  updated_at: string;
}
