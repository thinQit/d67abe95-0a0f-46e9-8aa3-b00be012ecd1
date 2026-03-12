# ShelfMarket

ShelfMarket is a modern bookstore marketplace with Google OAuth sign-in, a seeded catalog of books, and Unsplash-powered cover imagery. Buyers can browse and purchase listings; sellers can create listings and manage inventory. The app includes seller dashboards, reviews, and admin seed tooling.

## Features
- Google OAuth sign-in with JWT sessions
- Seeded book catalog with rich metadata and cover imagery
- Listings, orders, reviews, and seller dashboards
- Unsplash proxy search for book cover selection
- Admin seed tooling for books and images

## Setup
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   ```bash
   ./install.sh
   ```
3. Run migrations and start dev server:
   ```bash
   npx prisma migrate dev
   npm run dev
   ```

## API Endpoints
- GET `/api/health`
- GET `/api/auth/google`
- GET `/api/auth/google/callback`
- GET `/api/auth/me`
- POST `/api/auth/logout`
- GET `/api/books`
- POST `/api/books/seed`
- GET `/api/books/:id`
- POST `/api/books`
- PUT `/api/books/:id`
- DELETE `/api/books/:id`
- GET `/api/listings`
- POST `/api/listings`
- GET `/api/listings/:id`
- PUT `/api/listings/:id`
- DELETE `/api/listings/:id`
- POST `/api/orders`
- GET `/api/orders/:id`
- GET `/api/orders`
- POST `/api/images/unsplash/search`
- POST `/api/images/unsplash/select`
- GET `/api/categories`
- GET `/api/dashboard/seller`
- POST `/api/admin/seed/images`
