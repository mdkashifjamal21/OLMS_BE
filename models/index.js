// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('online_library', 'root', 'kashif21725', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Models
const User = require('../models/user')(sequelize, DataTypes);
const Book = require('../models/book')(sequelize, DataTypes);
const IssuedBook = require('../models/issuedBook')(sequelize, DataTypes);

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
  IssuedBook
};

module.exports = db;
