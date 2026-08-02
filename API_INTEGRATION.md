# API_INTEGRATION.md

## Overview

This document provides a comprehensive mapping of all frontend components, user actions, and React Query hooks to their corresponding backend API endpoints for the Equipment Rental Platform, categorized by user groups and roles.

---

## 1. Authentication Endpoints (`/api/v1/auth`)

Endpoints responsible for user session management, registration, and access control.

| Component / Feature           | Frontend Action / Hook      | HTTP Method | Backend Endpoint               | Description                                                            |
| :---------------------------- | :-------------------------- | :---------- | :----------------------------- | :--------------------------------------------------------------------- |
| **Login Page**                | `useAuthStore` / `mutation` | `POST`      | `/api/v1/auth/login`           | Authenticates user credentials and returns JWT token and user profile. |
| **Register Page**             | `useMutation`               | `POST`      | `/api/v1/auth/register`        | Registers a new user account (Customer or Provider).                   |
| **Navbar / Profile Dropdown** | `useAuthStore` / `logout`   | `POST`      | `/api/v1/auth/logout`          | Clears user session tokens and terminates authentication.              |
| **Password Reset Request**    | `useMutation`               | `POST`      | `/api/v1/auth/forgot-password` | Triggers a password recovery email for account recovery.               |
| **Password Reset Submit**     | `useMutation`               | `POST`      | `/api/v1/auth/reset-password`  | Updates user password using a secure reset token.                      |

---

## 2. Public Endpoints (`/api/v1/gear`, `/api/v1/reviews`, `/api/v1/contact`)

Endpoints accessible to all visitors without requiring authentication.

| Component / Feature            | Frontend Action / Hook                | HTTP Method | Backend Endpoint               | Description                                                                      |
| :----------------------------- | :------------------------------------ | :---------- | :----------------------------- | :------------------------------------------------------------------------------- |
| **Gear Catalog / Browse Page** | `useQuery` (`gear-list`)              | `GET`       | `/api/v1/gear`                 | Fetches the complete list of equipment and inventory items.                      |
| **Featured Gear Section**      | `useQuery` (`home-featured-gear`)     | `GET`       | `/api/v1/gear`                 | Fetches trending and verified gear items for homepage display.                   |
| **Gear Details Page**          | `useQuery` (`gear`, `gearId`)         | `GET`       | `/api/v1/gear/:id`             | Fetches detailed metadata, specifications, and availability for a specific item. |
| **Categories Listing**         | `useQuery` (`categories`)             | `GET`       | `/api/v1/categories`           | Retrieves all equipment classification categories.                               |
| **Customer Reviews Section**   | `useQuery` (`gear-reviews`, `gearId`) | `GET`       | `/api/v1/reviews/gear/:gearId` | Retrieves all customer reviews and star ratings for a specific item.             |
| **Contact Us Form**            | `useState` / `onSubmit`               | `POST`      | `/api/v1/contact`              | Submits user support messages and general platform inquiries.                    |

---

## 3. Customer Endpoints (`/api/v1/customer`, `/api/v1/rentals`, `/api/v1/reviews`)

Endpoints restricted to authenticated users with the `CUSTOMER` role.

| Component / Feature           | Frontend Action / Hook                   | HTTP Method     | Backend Endpoint             | Description                                                              |
| :---------------------------- | :--------------------------------------- | :-------------- | :--------------------------- | :----------------------------------------------------------------------- |
| **Customer Dashboard Stats**  | `useQuery` (`customer-stats`)            | `GET`           | `/api/v1/customer/stats`     | Retrieves summary counts of active, pending, and completed rentals.      |
| **Rental Booking Form**       | `useMutation` (`rentalApi.createRental`) | `POST`          | `/api/v1/rentals`            | Submits a new equipment rental booking request with start and end dates. |
| **Customer Rentals List**     | `useQuery` (`customer-rentals`)          | `GET`           | `/api/v1/rentals/customer`   | Retrieves active and past rental bookings for the logged-in customer.    |
| **Customer Rental Details**   | `useQuery` (`rental`, `rentalId`)        | `GET`           | `/api/v1/rentals/:id`        | Fetches specific rental order status and fulfillment tracking.           |
| **Cancel Rental Request**     | `useMutation`                            | `PATCH`         | `/api/v1/rentals/:id/cancel` | Allows customers to cancel a pending rental booking request.             |
| **Create Review Form**        | `useMutation`                            | `POST`          | `/api/v1/reviews`            | Submits a new customer star rating and review for rented equipment.      |
| **Customer Profile Settings** | `useQuery` / `useMutation`               | `GET` / `PATCH` | `/api/v1/customer/profile`   | Fetches and updates customer account details and avatar.                 |

---

## 4. Provider Endpoints (`/api/v1/provider`)

Endpoints restricted to authenticated users with the `PROVIDER` role.

| Component / Feature               | Frontend Action / Hook               | HTTP Method | Backend Endpoint                      | Description                                                           |
| :-------------------------------- | :----------------------------------- | :---------- | :------------------------------------ | :-------------------------------------------------------------------- |
| **Provider Dashboard Stats**      | `useQuery` (`provider-stats`)        | `GET`       | `/api/v1/provider/stats`              | Retrieves earnings, active gear count, and fulfillment summaries.     |
| **Provider Dashboard Gear**       | `useQuery` (`provider-gear`)         | `GET`       | `/api/v1/provider/gear`               | Fetches gear listings managed exclusively by the logged-in provider.  |
| **Provider Add Gear Form**        | `useMutation` (`gearApi.createGear`) | `POST`      | `/api/v1/gear`                        | Allows providers to add new equipment inventory items to the catalog. |
| **Provider Edit Gear Form**       | `useMutation` (`gearApi.updateGear`) | `PATCH`     | `/api/v1/gear/:id`                    | Updates existing equipment metadata, pricing, or stock counts.        |
| **Provider Delete Gear**          | `useMutation` (`gearApi.deleteGear`) | `DELETE`    | `/api/v1/gear/:id`                    | Removes an equipment listing from the provider catalog.               |
| **Provider Rentals Management**   | `useQuery` (`provider-rentals`)      | `GET`       | `/api/v1/provider/rentals`            | Retrieves incoming rental requests for the provider's inventory.      |
| **Provider Rental Status Action** | `useMutation`                        | `PATCH`     | `/api/v1/provider/rentals/:id/status` | Approves or rejects incoming customer rental booking requests.        |

---

## 5. Admin Endpoints (`/api/v1/admin`)

Endpoints restricted to users with the `ADMIN` role for platform governance.

| Component / Feature           | Frontend Action / Hook         | HTTP Method | Backend Endpoint                 | Description                                                            |
| :---------------------------- | :----------------------------- | :---------- | :------------------------------- | :--------------------------------------------------------------------- |
| **Admin Dashboard Analytics** | `useQuery` (`admin-analytics`) | `GET`       | `/api/v1/admin/analytics`        | Fetches platform-wide revenue, active users, and booking metrics.      |
| **Admin User Management**     | `useQuery` (`admin-users`)     | `GET`       | `/api/v1/admin/users`            | Retrieves all platform users (customers, providers, admins).           |
| **Admin User Status Update**  | `useMutation`                  | `PATCH`     | `/api/v1/admin/users/:id/status` | Activates, deactivates, or suspends user accounts across the platform. |
| **Admin Gear Moderation**     | `useQuery` (`admin-gear`)      | `GET`       | `/api/v1/admin/gear`             | Reviews all equipment listings across all providers.                   |
| **Admin Delete Gear**         | `useMutation`                  | `DELETE`    | `/api/v1/admin/gear/:id`         | Removes policy-violating listings from the platform.                   |
