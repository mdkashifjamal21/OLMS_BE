require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Logging to confirm environment
console.log(`[DB] Connecting to ${process.env.DB_HOST}`);

// Initialize Sequelize
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

// Load models
const models = {
  User: require('./user')(sequelize, DataTypes),
  Book: require('./book')(sequelize, DataTypes),
  IssuedBook: require('./issuedBook')(sequelize, DataTypes),
};

// Setup associations with explicit keys
models.User.hasMany(models.IssuedBook, {
  foreignKey: 'users_id',
  sourceKey: 'id_users'
});
models.Book.hasMany(models.IssuedBook, {
  foreignKey: 'books_id',
  sourceKey: 'id_books'
});
models.IssuedBook.belongsTo(models.User, {
  foreignKey: 'users_id',
  targetKey: 'id_users'
});
models.IssuedBook.belongsTo(models.Book, {
  foreignKey: 'books_id',
  targetKey: 'id_books'
});

// Export db object
const db = {
  ...models,
  sequelize,
  Sequelize,
};

module.exports = db;