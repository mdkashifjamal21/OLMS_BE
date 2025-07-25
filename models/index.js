// models/index.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Logging to confirm environment
console.log(`[DB] Connecting to ${process.env.DB_HOST}`);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
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

const db = {
  sequelize,
  Sequelize,
  User,
  Book,
  IssuedBook,
};

module.exports = db;