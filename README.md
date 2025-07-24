# Transaction Challenge API

A Node.js + Express REST API for user registration, login with JWT authentication, and transaction management. Uses SQLite for data storage and follows MCS architecture.

## Features
- User registration (`email`, `password`, `role`)
- User login (returns JWT)
- Auth middleware
- SQLite for users and transactions
- Transaction CRUD operations (`amount`, `type`, `description`, etc.)

## Setup
1. Install dependencies: `npm install`
2. Configure `.env` file
3. Populate the database with seed data: `node src/seedData.js`
4. Start server: `node src/app.js`

## Endpoints
- `POST /register` – Register a user
- `POST /login` – Login and get JWT
- `GET /transactions` – List all transactions (auth required)
- `POST /transactions` – Create a new transaction (auth required)
- `GET /transactions/:id` – Get a specific transaction (auth required)
- `PUT /transactions/:id` – Update a transaction (auth required)
- `DELETE /transactions/:id` – Delete a transaction (auth required)
