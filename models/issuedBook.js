module.exports = (sequelize, DataTypes) => {
  const IssuedBook = sequelize.define('IssuedBook', {
    id_issue: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    books_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fine_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

   IssuedBook.associate = (models) => {
    IssuedBook.belongsTo(models.User, {
      foreignKey: 'users_id',
      targetKey: 'id_users'
    });
    IssuedBook.belongsTo(models.Book, {
      foreignKey: 'books_id',
      targetKey: 'id_books'
    });
  };



  return IssuedBook;
};
