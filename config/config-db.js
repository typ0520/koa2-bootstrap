const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'koa2-bootstrap-dev',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'koa2-bootstrap-test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  }
};