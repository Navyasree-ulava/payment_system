# Paytm Backend API Routes

All routes are prefixed with `/api/v1` unless stated otherwise.

## General Routes

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Description**: Checks if the server is running.
- **Authentication**: None

---

## User Routes
Prefix: `/api/v1/user`

### User Signup
- **URL**: `/signup`
- **Method**: `POST`
- **Description**: Registers a new user and creates an initial account with a random balance.
- **Body**:
  ```json
  {
    "username": "example@test.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123"
  }
  ```
- **Authentication**: None

### User Signin
- **URL**: `/signin`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Body**:
  ```json
  {
    "username": "example@test.com",
    "password": "password123"
  }
  ```
- **Authentication**: None

### Get Current User
- **URL**: `/me`
- **Method**: `GET`
- **Description**: Returns the authenticated user's information (username, first name, last name).
- **Authentication**: Required (JWT Token in `Authorization` header)

### Update User Info
- **URL**: `/update`
- **Method**: `PUT`
- **Description**: Updates the authenticated user's profile information.
- **Body** (Optional fields):
  ```json
  {
    "password": "newpassword123",
    "firstName": "Johnny",
    "lastName": "Doesen"
  }
  ```
- **Authentication**: Required (JWT Token in `Authorization` header)

### Bulk Search Users
- **URL**: `/bulk`
- **Method**: `GET`
- **Description**: Searches for users by first or last name using a filter query parameter.
- **Query Params**: `filter` (string)
- **Authentication**: Required (JWT Token in `Authorization` header)

---

## Account Routes
Prefix: `/api/v1/account`

### Get Balance
- **URL**: `/balance`
- **Method**: `GET`
- **Description**: Returns the current balance of the authenticated user.
- **Authentication**: Required (JWT Token in `Authorization` header)

### Transfer Money
- **URL**: `/transfer`
- **Method**: `POST`
- **Description**: Transfers a specified amount from the authenticated user to another account. Uses database transactions for atomicity.
- **Body**:
  ```json
  {
    "to": "userId_of_recipient",
    "amount": 100
  }
  ```
- **Authentication**: Required (JWT Token in `Authorization` header)
