const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Import sequelize and models
const db = require('./models');
const sequelize = db.sequelize;

// Route Imports
const userRoutes = require('./routes/routesusers');
const bookRoutes = require('./routes/routesbooks');
const issuedBookRoutes = require('./routes/routesissuedBook');
const authRoutes = require('./routes/authRoutes');

// Mount Routes
app.use('/api/users', userRoutes);          // e.g., GET /api/users
app.use('/api/books', bookRoutes);          // e.g., GET /api/books
app.use('/api/issued-books', issuedBookRoutes); // e.g., GET /api/issued-books
app.use('/api/auth', authRoutes);          // e.g., POST /api/auth/login

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database synced!');
  app.listen(7000, () => {
    console.log('Server is running on port 7000');
  });
}).catch((err) => {
  console.error('Database sync failed:', err);
});
