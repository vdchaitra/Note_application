Full-Stack Notes Application
Overview
This project encompasses the backend and frontend setup for a comprehensive notes application. It features user authentication, authorization, and full CRUD operations for managing notes. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application ensures secure user interactions and a smooth user experience.

Features
User Authentication & Authorization:

Authentication: Secure login and registration using JSON Web Tokens (JWT).
Authorization: Role-based access to ensure users can only access their own notes.
JWT (JSON Web Tokens):

Encrypts data for secure transmission and stateless sessions.
Components include header, payload, and signature for integrity and security.
Hashing & Security:

Passwords are hashed using a one-way hashing algorithm with salt rounds for added security.
Frontend:

Built with React for a responsive and interactive user interface.
Features include user registration, login forms, and a notes dashboard with CRUD functionalities.
Backend:

Node.js and Express.js manage server-side logic and API endpoints.
MongoDB handles data storage for user information and notes.
CRUD Operations:

Create: Add new notes.
Read: Retrieve existing notes.
Update: Modify notes.
Delete: Remove notes.
Security & Data Handling:

Proper handling of Cross-Origin Resource Sharing (CORS) for secure API interactions.
Encryption of sensitive data and secure management of user sessions.
Getting Started
Setup:

Clone the repository.
Navigate to the backend and frontend directories.
Install dependencies using npm install for both backend and frontend.
Configuration:

Set up environment variables for database connection and JWT secrets in the backend.
Configure API endpoints in the frontend to connect with the backend server.
Run the Application:

Start the backend server using npm start in the backend directory.
Start the frontend development server using npm start in the frontend directory.
Endpoints:

Registration: /api/register
Login: /api/login
Notes CRUD: /api/notes (with relevant sub-routes for create, read, update, and delete operations)
