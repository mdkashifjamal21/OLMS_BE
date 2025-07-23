const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('online_library', 'root', 'kashif21725', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = sequelize;
