# API_INTEGRATION.md

## Overview

This document provides a comprehensive mapping of all frontend routes, user actions, and React Query hooks to their corresponding backend API endpoints for the Equipment Rental Platform. The endpoints are strictly categorized into **Auth**, **Public**, **Customer**, **Provider**, and **Admin** groups.

---

## 1. Auth Endpoints

Endpoints responsible for user registration, login, and session verification.

| Frontend Route             | Frontend Action / Hook      | HTTP Method | Backend Endpoint | Description                                                     |
| :------------------------- | :-------------------------- | :---------- | :--------------- | :-------------------------------------------------------------- |
| **`/register`**            | `useMutation`               | `POST`      | `/auth/register` | Registers a new user account.                                   |
| **`/login`**               | `useAuthStore` / `mutation` | `POST`      | `/auth/login`    | Authenticates user and returns session token.                   |
| **Global / Auth Provider** | `useQuery` (`auth-me`)      | `GET`       | `/auth/me`       | Validates current session and retrieves logged-in user details. |

---

## 2. Public Endpoints

Endpoints accessible to all visitors without requiring authentication.

| Frontend Route     | Frontend Action / Hook                | HTTP Method | Backend Endpoint        | Description                                                          |
| :----------------- | :------------------------------------ | :---------- | :---------------------- | :------------------------------------------------------------------- |
| **`/gear` / Home** | `useQuery` (`categories`)             | `GET`       | `/categories`           | Retrieves all available equipment classification categories.         |
| **`/gear`**        | `useQuery` (`gear-list`)              | `GET`       | `/gear`                 | Fetches all gear. Supports search and filtering params.              |
| **`/gear/[id]`**   | `useQuery` (`gear-details`, `id`)     | `GET`       | `/gear/:id`             | Retrieves detailed information for a specific gear item.             |
| **`/gear/[id]`**   | `useQuery` (`gear-reviews`, `gearId`) | `GET`       | `/reviews/gear/:gearId` | Retrieves all customer reviews associated with a specific gear item. |

---

## 3. Customer Endpoints

Endpoints restricted to authenticated users with the `CUSTOMER` role.

| Frontend Route                | Frontend Action / Hook               | HTTP Method | Backend Endpoint    | Description                                                           |
| :---------------------------- | :----------------------------------- | :---------- | :------------------ | :-------------------------------------------------------------------- |
| **`/gear/[id]` (Booking)**    | `useMutation`                        | `POST`      | `/rentals`          | Submits a new rental booking request.                                 |
| **`/customer/rentals`**       | `useQuery` (`customer-rentals`)      | `GET`       | `/rentals`          | Retrieves the list of all rental bookings for the logged-in customer. |
| **`/customer/rentals/[id]`**  | `useQuery` (`rental-details`, `id`)  | `GET`       | `/rentals/:id`      | Fetches specific details and status of a single rental booking.       |
| **`/checkout/[id]`**          | `useMutation`                        | `POST`      | `/payments/create`  | Initializes a payment intent/session for a rental order.              |
| **`/checkout/success`**       | `useMutation`                        | `POST`      | `/payments/confirm` | Confirms successful payment processing.                               |
| **`/customer/payments`**      | `useQuery` (`payment-history`)       | `GET`       | `/payments`         | Retrieves the customer's overall billing and payment history.         |
| **`/customer/payments/[id]`** | `useQuery` (`payment-details`, `id`) | `GET`       | `/payments/:id`     | Retrieves the receipt and detailed breakdown of a specific payment.   |
| **`/customer/rentals/[id]`**  | `useMutation`                        | `POST`      | `/reviews`          | Submits a review and rating for a completed rental.                   |

---

## 4. Provider Endpoints

Endpoints restricted to authenticated users with the `PROVIDER` role.

| Frontend Route                 | Frontend Action / Hook         | HTTP Method | Backend Endpoint       | Description                                                     |
| :----------------------------- | :----------------------------- | :---------- | :--------------------- | :-------------------------------------------------------------- |
| **`/provider/gear/new`**       | `useMutation`                  | `POST`      | `/gear`                | Adds a new equipment listing to the catalog.                    |
| **`/provider/gear/[id]/edit`** | `useMutation`                  | `PUT`       | `/gear/:id`            | Updates existing equipment details, pricing, and stock.         |
| **`/provider/gear`**           | `useMutation`                  | `DELETE`    | `/gear/:id`            | Removes an equipment listing from the platform.                 |
| **`/provider/orders`**         | `useQuery` (`provider-orders`) | `GET`       | `/provider/orders`     | Retrieves all incoming rental requests for the provider's gear. |
| **`/provider/orders`**         | `useMutation`                  | `PATCH`     | `/provider/orders/:id` | Approves, rejects, or updates the status of a customer order.   |

---

## 5. Admin Endpoints

Endpoints restricted to users with the `ADMIN` role for platform governance.

| Frontend Route          | Frontend Action / Hook       | HTTP Method | Backend Endpoint   | Description                                                     |
| :---------------------- | :--------------------------- | :---------- | :----------------- | :-------------------------------------------------------------- |
| **`/admin/categories`** | `useMutation`                | `POST`      | `/categories`      | Creates a new equipment category platform-wide.                 |
| **`/admin/users`**      | `useQuery` (`admin-users`)   | `GET`       | `/admin/users`     | Retrieves a list of all users registered on the platform.       |
| **`/admin/users`**      | `useMutation`                | `PATCH`     | `/admin/users/:id` | Modifies user roles or account status (e.g., ban/activate).     |
| **`/admin/gear`**       | `useQuery` (`admin-gear`)    | `GET`       | `/admin/gear`      | Retrieves all gear listings platform-wide for moderation.       |
| **`/admin/rentals`**    | `useQuery` (`admin-rentals`) | `GET`       | `/admin/rentals`   | Retrieves all rental transactions platform-wide for monitoring. |
