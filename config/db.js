require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,     // 'railway'
  process.env.DB_USER,     // 'root'
  process.env.DB_PASSWORD, // 'kluyDOPehagHWVTEiqaLxumGJfnGeYHw'
  {
    host: process.env.DB_HOST,  // 'mysql.railway.internal'
    port: process.env.DB_PORT,  // '3306'
    dialect: 'mysql'
  }
);

module.exports = sequelize;
