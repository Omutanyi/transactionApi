# API Documentation

## Authentication
- Some endpoints require a JWT token in the `Authorization` header:
  - Format: `Authorization: Bearer <token>`

---

## Endpoints

### Register User
- **POST** `/signup`
- **Body:**
  ```json
  { "email": "user@example.com", "password": "yourpassword", "role": "psp" }
  ```
- **Response:**
  ```json
  { "message": "User registered", "user": { "id": 1, "email": "user@example.com", "role": "psp" } }
  ```
- **Errors:**
  - 400: Invalid input or email already exists

---

### Login
- **POST** `/login`
- **Body:**
  ```json
  { "email": "user@example.com", "password": "yourpassword" }
  ```
- **Response:**
  ```json
  { "message": "Login successful", "success": true, "token": "<jwt>", "user": { "id": 1, "email": "user@example.com", "role": "psp" } }
  ```
- **Errors:**
  - 400: Invalid input
  - 401: Invalid credentials
  - 500: Login failed

---

### Get All Users
- **GET** `/users`
- **Response:**
  ```json
  [ { "id": 1, "email": "user@example.com" }, ... ]
  ```
- **Errors:**
  - 500: Failed to fetch users

---

### Get Transactions (Auth required)
- **GET** `/transactions`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  ```json
  [ { "id": 1, "user_id": 1, "recipient_id": 2, "amount": 100, "currency": "USD", "type": "payment", "created_at": "..." }, ... ]
  ```
- **Errors:**
  - 401: No token provided
  - 403: Invalid token
  - 500: Failed to fetch transactions

---

### Send Transaction (Auth required)
- **POST** `/send`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  { "recipient_id": 2, "amount": 100, "currency": "USD", "type": "payment" }
  ```
- **Response:**
  ```json
  { "message": "Transaction sent", "transaction": { "id": 1, "user_id": 1, "recipient_id": 2, "amount": 100, "currency": "USD", "type": "payment" } }
  ```
- **Notes:**
  - Triggers a POST to a mock webhook URL (https://usewebhook.com/) with transaction data.
- **Errors:**
  - 400: Missing required fields
  - 401: No token provided
  - 403: Invalid token
  - 500: Failed to send transaction
