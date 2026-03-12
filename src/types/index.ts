export type Image = {
  id: string;
  url: string;
  alt?: string | null;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string | null;
  price?: number | null;
  images?: Image[];
};

export type Listing = {
  id: string;
  bookId: string;
  sellerId: string;
  price: number;
  condition?: string | null;
  createdAt?: string;
  book?: Book;
  images?: Image[];
};

export type Review = {
  id: string;
  listingId: string;
  userId: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
};

export type Order = {
  id: string;
  listingId: string;
  buyerId: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  createdAt?: string;
};
