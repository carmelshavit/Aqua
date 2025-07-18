# User Management Server

This project implements a basic RESTful API for managing users, including validation for Israeli ID numbers and phone numbers.

---

## 📌 API Endpoints

### `GET /users`
Returns a list of user names.

### `GET /users/:name`
Returns full details of a user by name.

### `POST /users`
Adds a new user with the following JSON structure:

```json
{
  "id": 123456782,
  "name": "Dana",
  "phone": "0501234567",
  "address": "Tel Aviv"
}
```

---

## ✅ Validation Rules

- `id` must be a valid Israeli ID (9 digits, with correct checksum)
- `phone` must be a valid Israeli phone number (e.g. "0501234567", "03-6543210")

If validation fails, a relevant error is returned and the user is not saved.

---

## 🧪 Example Tests

### ✔️ Test 1 – Add a valid user
**Request:**
```http
POST /users
```
**Body:**
```json
{
  "id": 123456782,
  "name": "Dana",
  "phone": "0501234567",
  "address": "Tel Aviv"
}
```
**Expected Response:**
```json
{ "id": 123456782 }
```

---

### ❌ Test 2 – Invalid ID
**Request:**
```http
POST /users
```
**Body:**
```json
{
  "id": 123456789,
  "name": "Tom",
  "phone": "0501234567",
  "address": "Haifa"
}
```
**Expected Response:**
```json
{ "error": "Invalid Israeli ID" }
```

---

### ❌ Test 3 – Invalid phone number
**Request:**
```http
POST /users
```
**Body:**
```json
{
  "id": 123456782,
  "name": "Roni",
  "phone": "12345",
  "address": "Jerusalem"
}
```
**Expected Response:**
```json
{ "error": "Invalid phone number" }
```

---

## 🖥️ How to Run the Server

### 1. Requirements
- Node.js v14 or higher installed
- This project folder should include:
  - `server.js`
  - `user.routes.js`
  - `user.controller.js`
  - `user.service.js`
  - Optional: `users.json` (can be empty)

### 2. Install dependencies:
```bash
npm install
```

### 3. Run the server:
```bash
node server.js
```

Server will be available at:
```
http://localhost:3000
```

You can test the endpoints using [Postman](https://www.postman.com/) or with `curl`.

---

## ✨ Notes

- All user data is saved in `users.json`
- Duplicate user names are not allowed
- Input is validated before insertion
- Project structure is modular (router, controller, service separated)
