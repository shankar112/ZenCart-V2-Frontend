# ZenCart-V2 Frontend

This is the frontend for ZenCart-V2, a modern e-commerce web application built with React. It provides a user-friendly interface for browsing products, managing a shopping cart, and completing purchases.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [State Management](#state-management)

## Technologies Used

-   **React**: A JavaScript library for building user interfaces
-   **Vite**: A fast build tool and development server for modern web projects
-   **React Router**: For client-side routing and navigation
-   **Redux Toolkit**: For efficient and predictable state management
-   **Redux Persist**: To save the Redux store in local storage
-   **Axios**: For making HTTP requests to the backend API
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development
-   **React Toastify**: For displaying notifications
-   **React Icons**: For including popular icons

## Project Structure

```
zencart-v2-frontend/
├── src/
│   ├── components/      # Reusable UI components (Navbar, ProductCard, etc.)
│   ├── pages/           # Top-level page components (Home, Cart, Login, etc.)
│   ├── redux/           # Redux store, slices (cart, user), and configuration
│   ├── App.jsx          # Main application component with routing
│   ├── main.jsx         # Entry point of the application
│   └── requestMethods.js # Axios instances for API communication
├── public/              # Static assets
└── tailwind.config.js   # Tailwind CSS configuration
```

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or newer)
-   The [ZenCart-V2 Backend API](<path-to-backend-readme.md>) must be running.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd zencart-v2-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Backend API URL

The application is configured to connect to the backend API at `http://localhost:5000/api/`.

If your backend is running on a different address, you must update the `BASE_URL` constant in the `src/requestMethods.js` file:

```javascript
// src/requestMethods.js
const BASE_URL = "http://your-backend-api-url/api/";
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

-   **`npm run dev`**: Starts the Vite development server with Hot Module Replacement (HMR).
-   **`npm run build`**: Bundles the application for production into the `dist` folder.
-   **`npm run lint`**: Lints the codebase using ESLint.
-   **`npm run preview`**: Serves the production build locally to preview it.

## State Management

This application uses **Redux Toolkit** for state management.

-   **Slices**: The state is organized into "slices" located in `src/redux/`.
    -   `cartRedux.js`: Manages the state of the shopping cart (products, quantity, total).
    -   `userRedux.js`: Manages the user's authentication state (current user, tokens).
-   **Persistence**: **Redux Persist** is used to save the entire store to the browser's `localStorage`. This ensures that the user's cart and login session are preserved across browser sessions.
-   **Store**: The Redux store is configured in `src/redux/store.js`.
