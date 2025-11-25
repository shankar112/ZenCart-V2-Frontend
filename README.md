# ZenCart-V2 Frontend

This is the frontend for ZenCart-V2, a modern e-commerce web application built with React. It provides a user-friendly interface for browsing products, managing a shopping cart, and completing purchases.

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