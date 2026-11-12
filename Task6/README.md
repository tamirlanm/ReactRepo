
# ProductExplorer — Task 6

An extended React Single Page Application
developed for the Server Data, Caching
and Firebase Authentication homework.

## Overview

ProductExplorer is a product catalog application
that uses DummyJSON API and Firebase Authentication.

This project extends Task5 by adding authentication,
protected routes, persistent sessions,
environment variables, and server-data caching.

## Technologies

- React
- Vite
- JavaScript
- React Router
- Firebase Authentication
- TanStack Query
- DummyJSON API
- CSS
- GitHub Pages

## Features

- Product catalog
- Search and category filtering
- Rating filtering
- Sorting and pagination
- Dynamic product details
- Dashboard statistics
- Lazy-loaded pages
- Custom 404 page
- Email and password authentication
- Google sign-in
- User registration
- Protected profile page
- Persistent authentication sessions
- Conditional navigation
- API caching and cache invalidation

## Installation

1. Clone the repository.
2. Navigate to Task6.
3. Run npm install.
4. Copy .env.example to .env.local.
5. Fill in your Firebase configuration.
6. Run npm run dev.

## Firebase Configuration

The following environment variables are required:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

Enable Email/Password and Google providers
in Firebase Authentication.

Add localhost and your deployed domain
to Firebase Authorized Domains.

The .env.local file is excluded from Git.

## Authentication

Authentication state is managed by AuthContext
and AuthProvider.

The application uses onAuthStateChanged
to track the current user.

Firebase maintains persistent sessions
using browser persistence.

The profile page is protected by ProtectedRoute.

Unauthenticated users are redirected to Login.

## Caching Strategy

The application uses TanStack Query
for server-data caching.

Query keys:

- ["products", "list"] — all products
- ["products", "detail", id] — individual product

The product catalog and dashboard share
the same product-list cache.

Data is considered fresh for 2 minutes.

Inactive cache entries are retained
for 10 minutes before garbage collection.

Stale queries are revalidated when needed,
including when a stale query is mounted again.

## Cache Invalidation

The product-list cache can be invalidated
using the Refresh Data button.

After a successful product update,
all related product queries are invalidated
using the ["products"] query-key prefix.

Active queries are refetched,
while inactive queries are marked as stale.

DummyJSON simulates product updates
without permanently saving changes.

The update-stock feature demonstrates
mutations and cache invalidation.

## Request Cancellation

TanStack Query provides an AbortSignal
to query functions.

The signal is passed to fetch to support
request cancellation.

Product details use unique query keys,
preventing responses for different products
from overwriting each other.

## Routes

| Route | Access |
|---|---|
| / | Public |
| /about | Public |
| /products | Public |
| /products/:id | Public |
| /dashboard | Public |
| /login | Public |
| /signup | Public |
| /profile | Protected |
| * | Public |

HashRouter is used to support direct navigation
and refreshes on GitHub Pages.

## Deployment

The application is deployed using GitHub Pages.

Deployment command: npm run deploy

Live application:

https://tamirlanm.github.io/ReactRepo/Task6/

## API

https://dummyjson.com/docs/products
