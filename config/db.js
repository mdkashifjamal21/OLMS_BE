const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Load correct environment file based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config(); // Default: .env for local
}


const sequelize = new Sequelize(
  process.env.DB_NAME,     // 'railway'
  process.env.DB_USER,     // 'root'
  process.env.DB_PASSWORD, // 'kluyDOPehagHWVTEiqaLxumGJfnGeYHw'
  {
    host: process.env.DB_HOST,  // 'mysql.railway.internal'
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  }
);

module.exports = sequelize;
