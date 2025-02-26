const { Sequelize } = require('sequelize');
const config = require('./config/config');

// Create a new Sequelize instance using values from config
const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Export the Sequelize instance
module.exports = sequelize;
