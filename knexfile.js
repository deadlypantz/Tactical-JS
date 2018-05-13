// Update with your config settings.
require('dotenv').config();
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
