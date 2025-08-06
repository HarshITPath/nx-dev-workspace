# Backend Service for Fullstack Monorepo

This is a Node.js backend service that provides backend functionality for the frontend applications in the monorepo.

## Features

- RESTful API endpoints for users and products
- Express.js server with CORS support
- Mock data for demonstration purposes

## API Endpoints

### Root
- `GET /` - Welcome message and available endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user

### Products
- `GET /api/products` - Get all products (supports filtering by category and inStock status)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the backend directory
cd apps/backend

# Install dependencies
npm install
```

### Running the Backend

```bash
# Using NX (from root directory)
npx nx dev backend

# Or directly with Node.js (from backend directory)
node src/main.js
```

## Integration with Frontend Applications

The frontend applications in this monorepo are configured to communicate with this backend service. The API base URL is set to `http://localhost:3000/api` in the frontend service files.