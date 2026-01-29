# Habit Tracker (Full-Stack)

A simple full-stack habit tracking application built to reinforce **core full-stack fundamentals**.

The focus of this project is correctness, data flow, and authentication — not UI polish.

---

## Tech Stack

### Frontend

- React
- React Router
- Context API (auth state)
- Fetch API

### Backend

- Node.js
- Express
- PostgreSQL
- JWT authentication
- bcrypt for password hashing

---

## Core Features

Users can:

- **Authenticate**
  - Sign up and log in with email/password
  - JWT-based authentication
  - Protected routes

- **Manage habits**
  - Create, edit, and delete habits
  - Habits are user-specific

- **Daily check-ins**
  - One check-in per habit per day
  - Server-side constraint prevents duplicates
  - Progress shown as check-ins per week

- **Authorization**
  - Users can only access their own data
  - All habit and check-in routes are protected

---
