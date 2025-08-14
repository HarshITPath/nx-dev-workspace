import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Shared utilities
import { formatDate, capitalize } from '@fullstack-monorepo/utils';

// Import TypeScript routes
import usersRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';

// Environment configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || 'localhost';
const CORS_ORIGIN = (process.env.CORS_ORIGIN || 'http://localhost:4200,http://localhost:4300')
  .split(',')
  .map((s) => s.trim());

const app: Express = express();

// Middleware
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    environment: NODE_ENV,
    timestamp: formatDate(new Date()),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Root route
app.get('/', (_req: Request, res: Response) => {
  const serverName = capitalize(`fullstack monorepo backend (${NODE_ENV})`);
  const currentDate = formatDate(new Date());

  res.json({
    message: `Welcome to the ${serverName}`,
    environment: NODE_ENV,
    date: currentDate,
    endpoints: ['/api/health', '/api/users', '/api/products'],
    config: {
      cors: CORS_ORIGIN,
      port: PORT,
      host: HOST
    },
  });
});

// Error handling middleware (FIXED: Added NextFunction parameter)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (NODE_ENV === 'development') {
    console.error(err.stack);
  }
  res.status(500).json({ 
    message: 'Internal Server Error', 
    ...(NODE_ENV === 'development' && { stack: err.stack }) 
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on ${HOST}:${PORT}`);
  console.log(`📅 Started at: ${formatDate(new Date())}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🔧 CORS Origins: ${CORS_ORIGIN.join(', ')}`);
});

export default app;