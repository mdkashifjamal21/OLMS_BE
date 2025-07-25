const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

/// Load correct .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

// Logging to confirm which env is used
console.log(`[DB] Running in ${process.env.NODE_ENV} mode using ${envFile}`);


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
