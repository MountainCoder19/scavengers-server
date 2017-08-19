module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'scavengers',
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'scavengers-test',
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  }

};
