// models/index.js
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');

// Load correct environment file based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config(); // Default: .env for local
}

// Initialize Sequelize using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,     // 'railway'
  process.env.DB_USER,     // 'root'
  process.env.DB_PASSWORD, // 'kluyDOPehagHWVTEiqaLxumGJfnGeYHw'
  {
    host: process.env.DB_HOST,  // 'mysql.railway.internal'
    port: process.env.DB_PORT || 3306,  // '3306'
    dialect: 'mysql'
  }
);

// Models
const User = require('./user')(sequelize, DataTypes);
const Book = require('./book')(sequelize, DataTypes);
const IssuedBook = require('./issuedBook')(sequelize, DataTypes);

// Associations
User.hasMany(IssuedBook, { foreignKey: 'users_id' });
Book.hasMany(IssuedBook, { foreignKey: 'books_id' });
IssuedBook.belongsTo(User, { foreignKey: 'users_id' });
IssuedBook.belongsTo(Book, { foreignKey: 'books_id' });

// Export DB object
const db = {
  sequelize,
  Sequelize,
  User,
  Book,
  IssuedBook
};

module.exports = db;
