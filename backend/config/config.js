require('dotenv').config();

const environmentConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres'
};

module.exports = {
  port: process.env.PORT || 3000,

  database: environmentConfig,

  // For Sequelize CLI
  development: environmentConfig,
  test: environmentConfig,
  production: process.env.DATABASE_URL
    ? {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    : environmentConfig
};
