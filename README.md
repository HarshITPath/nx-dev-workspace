# NX.dev Fullstack Monorepo Demo

This is a demonstration of a fullstack monorepo using NX.dev. The project includes:

- Frontend Admin application
- Frontend Customer application
- Shared UI Components library

## Project Structure

```
├── apps/
│   ├── frontend-admin/        # Admin portal application
│   ├── frontend-admin-e2e/    # E2E tests for admin portal
│   ├── frontend-customer/     # Customer portal application
│   └── frontend-customer-e2e/ # E2E tests for customer portal
├── libs/
│   └── ui-components/        # Shared UI components library
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Applications

#### Run the Admin Portal

```bash
npx nx dev frontend-admin
```

The admin portal will be available at http://localhost:4200

#### Run the Customer Portal

```bash
npx nx dev frontend-customer
```

The customer portal will be available at http://localhost:4200 (or another port if 4200 is already in use)

## Shared UI Components

The project includes a shared UI components library that is used by both frontend applications. This demonstrates code sharing in a monorepo architecture.

Components include:

- Button - A reusable button component with different variants and sizes
- Card - A container component for displaying content in a card format

## Adding a Backend

To add a backend service to this monorepo:

```bash
# Generate a new Node.js application
npx nx g @nx/node:app api
```

## Testing

```bash
# Run tests for all projects
npx nx run-many --target=test --all

# Run tests for a specific project
npx nx test frontend-admin
```

## Building for Production

```bash
# Build all projects
npx nx run-many --target=build --all

# Build a specific project
npx nx build frontend-admin
```

## Learn More

- [NX Documentation](https://nx.dev/)
- [React Documentation](https://reactjs.org/)
