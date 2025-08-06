const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Fullstack Monorepo Backend',
    endpoints: [
      '/api/users',
      '/api/products'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});