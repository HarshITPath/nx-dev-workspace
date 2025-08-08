<!-- # NX.dev Fullstack Monorepo Demo

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
- [React Documentation](https://reactjs.org/) -->



# Fullstack Monorepo

This is an Nx workspace containing a fullstack application with:
- **frontend-admin**: React admin interface
- **frontend-customer**: React customer interface  
- **backend**: Node.js Express server
- **ui-components**: Shared UI component library

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Projects

#### Development Mode
```bash
# Run all projects in development mode
npm run dev:admin      # Frontend Admin (port 4200)
npm run dev:customer   # Frontend Customer (port 4300) 
npm run dev:backend    # Backend server
```

#### Build Projects
```bash
npm run build:admin    # Build frontend admin
npm run build:customer # Build frontend customer
npm run build:backend  # Build backend
```

#### Testing
```bash
npm run test:admin     # Test frontend admin
npm run test:customer  # Test frontend customer
npm run test:backend   # Test backend
```

#### Linting
```bash
npm run lint:admin     # Lint frontend admin
npm run lint:customer  # Lint frontend customer
npm run lint:backend   # Lint backend
```

## 🔧 Nx Commands

You can also use Nx directly:
```bash
# List all projects
npx nx show projects

# Run specific targets
npx nx run frontend-admin:dev
npx nx run frontend-customer:dev
npx nx run backend:serve

# Build specific projects
npx nx run frontend-admin:build
npx nx run frontend-customer:build
npx nx run backend:build
```

## 🐛 Issues Fixed

The following configuration issues were resolved:

1. **Missing project.json files**: Created `project.json` files for:
   - `apps/frontend-admin/project.json`
   - `apps/backend/project.json`
   - `libs/ui-components/project.json`

2. **Implicit dependency errors**: Fixed project references in e2e projects:
   - Updated `apps/frontend-admin-e2e/package.json`
   - Updated `apps/frontend-customer-e2e/package.json`

3. **Missing dependencies**: Added required dependencies to:
   - `apps/frontend-admin/package.json`

4. **Vite configuration**: Fixed plugin configuration in:
   - `apps/frontend-customer/vite.config.ts`

## 📁 Project Structure

```
fullstack-monorepo/
├── apps/
│   ├── frontend-admin/          # React admin interface
│   ├── frontend-admin-e2e/      # E2E tests for admin
│   ├── frontend-customer/       # React customer interface
│   ├── frontend-customer-e2e/   # E2E tests for customer
│   └── backend/                 # Node.js Express server
├── libs/
│   └── ui-components/           # Shared UI components
└── package.json                 # Root workspace configuration
```

## 🛠️ Development

This workspace uses:
- **Nx** for monorepo management
- **React** for frontend applications
- **Vite** for build tooling
- **TypeScript** for type safety
- **Jest** for testing
- **ESLint** for linting

## 📝 Notes

- The frontend applications run on different ports (4200 for admin, 4300 for customer)
- The backend server can be configured to run on any port
- All projects share dependencies from the root `package.json`
- E2E tests are configured for both frontend applications
