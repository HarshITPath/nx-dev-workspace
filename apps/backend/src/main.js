import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import shared utilities
import { formatDate, capitalize, isEmail, slugify } from '@fullstack-monorepo/utils';

// Import routes
import usersRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add utility middleware
app.use((req, res, next) => {
  req.utils = {
    formatDate,
    capitalize,
    isEmail,
    slugify
  };
  next();
});

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

// Root route with utils
app.get('/', (req, res) => {
  const serverName = capitalize('fullstack monorepo backend');
  const currentDate = formatDate(new Date());
  
  res.json({
    message: `Welcome to the ${serverName}`,
    date: currentDate,
    endpoints: [
      '/api/users',
      '/api/products'
    ],
    utils: {
      available: ['formatDate', 'capitalize', 'isEmail', 'slugify'],
      example: {
        original: 'hello world',
        capitalized: capitalize('hello world'),
        slugified: slugify('Hello World!')
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Started at: ${formatDate(new Date())}`);
});