# Payment System (Basic Version)

A simplified payment system implementation featuring user authentication, balance management, and secure fund transfers.

## 🚀 Overview

This project is a full-stack application that demonstrates the core logic of a digital wallet. Users can register, log in, view their current balance, and securely transfer funds to other users within the system.

## 🛠️ Technology Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB using Mongoose ODM
- **Validation**: Zod (for input validation)
- **Security**: JSON Web Tokens (JWT) for authentication
- **Transactions**: MongoDB Sessions/Transactions for atomic fund transfers

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)

## ✨ Core Features

- **User Authentication**: Secure Signup and Signin flow.
- **Account Management**: Automatic account creation with a random initial balance upon signup.
- **Profile Management**: View and update personal information (First Name, Last Name, Password).
- **Dashboard**: Real-time view of user balance and user search functionality.
- **Atomic Transfers**: Secure peer-to-peer money transfers using database transactions to ensure data integrity.

## 📂 Project Structure

```text
├── backend/            # Express API, MongoDB models, and business logic
│   └── routes.md       # Detailed API documentation
├── frontend/           # React application built with Vite
├── Dockerfile          # Containerization configuration
└── README.md           # Project overview
```

## 🚥 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Setup

1. **Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file with JWT_SECRET and MONGODB_URI
   npm start
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📖 API Documentation

For a full list of available API endpoints and examples, please refer to the [Backend Routes Documentation](file:///backend/routes.md).
