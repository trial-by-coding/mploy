var localuser = require('./localuser.js');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'mploy_dev',
      user: 'ubuntu',

    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client:'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
