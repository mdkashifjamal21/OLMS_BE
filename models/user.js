
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
  id_users: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: DataTypes.STRING,
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('student', 'admin', 'librarian'),
    defaultValue: 'student'
  },
  IsActive: DataTypes.TINYINT,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

return User;
};
