const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB,
    "host": process.env.DB_HOST,
    "port": process.env.DB_HOST_PORT,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB,
    "host": process.env.DB_HOST,
    "port": process.env.DB_HOST_PORT,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB,
    "host": process.env.DB_HOST,
    "port": process.env.DB_HOST_PORT,
    "dialect": process.env.DB_DIALECT
  }
}
