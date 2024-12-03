# Web Application - Portfolio Project - The MovieVerse

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Functionalities](#functionalities)
8. [Contributing](#contributing)
9. [License](#license)

## Description
This is a web application developed as part of my professional portfolio, aiming to demonstrate my web development skills using modern architecture and popular technologies.

## Features
- **Modular MVC Architecture**: The application is structured using the MVC pattern to maintain clean, maintainable, and scalable code.
- **Backend with Express.js and Node.js**: The backend is developed with Express.js and Node.js, providing a RESTful API for frontend communication.
- **Validations with Zod**: I use Zod for data validations in the backend, ensuring user input is correct and consistent.
- **Frontend with React.js**: The frontend is developed with React.js, allowing for an interactive, modular, and efficient user interface.
- **Authentication and Authorization (if applicable)**: Implementation of a basic authentication system using JWT tokens to ensure user security.
- **RESTful API**: The application exposes RESTful endpoints to interact with application resources.
- **Error Management**: Proper controls have been implemented to handle errors in the backend and improve user experience.

## Technologies Used
### Backend
- Node.js
- Express.js
- Zod
- JWT (JSON Web Tokens)
- Sequelize
- SQLite
- bcrypt
- cookie-parser
- cors
- dotenv
- picocolors
- standard

### Frontend
- React.js
- React Router
- React Redux
- Axios
- Yup
- React Hook Form
- Bootstrap
- React Icons
- React-Scripts
- @testing-library/react
- @testing-library/user-event
- @hookform/resolvers

## Installation
### Prerequisites
Node.js and npm must be installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Instructions
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2.Navigate to the project directory:
   ```bash
   cd your-repository
   ```
3.Install dependencies for both frontend and backend
   **For the backend:**
      ```bash
      cd backend
      npm install
      ```
   **For the frontend:**
      ```bash
      cd frontend
      npm install
      ```
4.Start the backend server:
   ```bash
   cd backend
   npm start
   ```
The backend server should be running at http://localhost:3000 (or the port you configured).
5.Start the frontend server
   ```bash
   cd frontend
   npm start
   ```
The frontend should be running at http://localhost:3006 (or the port you configured).
Open your browser and go to http://localhost:3000 to see the application running.

 ### Project Structure
 ```bash
    /your-repository
   |-- /backend                # Backend (Node.js / Express.js)
   |   |-- /controllers        # Controllers
   |   |-- /models             # Data models (e.g., database connection)
   |   |-- /routes             # API routes
   |   |-- /services           # Business logic
   |   |-- /utils              # Utilities and configurations
   |   |-- app.js              # Entry point of the Express server
   |-- /frontend               # Frontend (React.js)
   |   |-- /components         # React components
   |   |-- /pages              # Application pages
   |   |-- /services           # Logic to interact with the backend
   |   |-- /styles             # CSS style files
   |   |-- App.js              # Entry point of the frontend
   |-- /README.md              # This file
```

## Functionalities
- **User Registration and Login (if applicable)**
- **Resource Viewing**: Users can view a list of items (e.g., products, movies, etc.).
- **API Interaction**: The frontend communicates with the backend to perform CRUD operations (Create, Read, Update, Delete).
- **Pagination and Search**: Implementation of pagination and search functionalities.
- **Validations**: Using Zod to ensure input data is correct and secure.

   
