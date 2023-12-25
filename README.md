## TAMS - Twitter Account Management System

### Setup

1. Install Node.js

- Install all dependencies

```bash
npm install
```

- Copy `.env.example` and rename the copied file to `.env`. Then change the environment variable according to your needs

### Installation

- Developement

```bash
# Development mode with file watch
npm run dev
```

- Build and run

```bash
# Build the web application
npm run build

# Run the build
npm start
```

### Notes

#### Utilities

- Format codebase

```bash
# Format the whole code base using Prettier
npm run format
```

- Lint codebase

```bash
# Lint the whole coe base using ESLint
npm run lint
```

- For docker user

```bash
# Start application with docker compose
npm run docker:start

# Stop application with docker compose
npm run docker:stop
```

#### Environment variables

- `NEXT_PUBLIC_API_HOST`: Backend server host. Do NOT add trailing `/` at the end
