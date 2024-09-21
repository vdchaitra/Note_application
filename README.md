# Full-Stack Notes Application

## Overview

This project is a full-stack notes application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a secure and interactive platform where users can register, log in, and manage their notes with full CRUD functionality.

## Features

- **User Authentication & Authorization**:
  - **Authentication**: Secure login and registration using JSON Web Tokens (JWT).
  - **Authorization**: Role-based access to ensure users can only access their own notes.

- **JWT (JSON Web Tokens)**:
  - Securely transmits data by encrypting it into a non-readable format.
  - Components include header, payload, and signature for integrity and security.

- **Hashing & Security**:
  - Passwords are hashed using a one-way process with salt rounds for added security.

- **Frontend**:
  - Built with React for a responsive and interactive user interface.
  - Features include user registration, login forms, and a notes dashboard with CRUD functionalities.

- **Backend**:
  - Node.js and Express.js manage server-side logic and API endpoints.
  - MongoDB handles data storage for user information and notes.

- **CRUD Operations**:
  - **Create**: Add new notes.
  - **Read**: Retrieve existing notes.
  - **Update**: Modify notes.
  - **Delete**: Remove notes.

- **Security & Data Handling**:
  - Handles Cross-Origin Resource Sharing (CORS) to manage requests from different origins.
  - Encrypts sensitive information and manages user sessions using tokens.
 ## Live Demo
Check out the live demo of the Note App [Here](https://note-application-4d67.vercel.app/login)

## Getting Started

1. **Setup**:
   - Clone the repository.
   - Navigate to the `backend` and `frontend` directories.
   - Install dependencies using `npm install` for both backend and frontend.

2. **Configuration**:
   - Set up environment variables for database connection and JWT secrets.

3. **Run the Application**:
   - Start the backend server using `npm run dev` in the `backend` directory.
   - Start the frontend development server using `npm run dev` in the `frontend` directory.

4. **Endpoints**:
   - **Registration**: `/api/user/register`
   - **Login**: `/api/user/login`
   - **Notes CRUD**: `/api/notes` (with routes for create, read, update, and delete operations)

