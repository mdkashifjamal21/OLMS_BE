// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());

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
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/issued-books', issuedBookRoutes);
app.use('/api/auth', authRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('✅ Database synced!');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Database sync failed:', err);
});