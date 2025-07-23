module.exports = (sequelize, DataTypes) => {
const Book = sequelize.define('Book', {
  id_books: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Author: DataTypes.STRING,
  Title: DataTypes.STRING,
  Isbn: DataTypes.STRING,
  total_copies: DataTypes.INTEGER,
  Avaible_copies: DataTypes.INTEGER,
  added_book: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'books',
  timestamps: false
});

return Book;
};


