const mysql = require('mysql2');

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME,
  } = require('./env');

  class Database {
    init() {
      this.connectionOptions = {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        multipleStatements: true,
        namedPlaceholders: true,
      };
      this.connection = mysql.createConnection(this.connectionOptions);
      this.pool = mysql.createPool(this.connectionOptions);
  
      return this;
    }

    async query(...args) {
        // unfortunatly, .format() on pooled connections does not seem to support named parameters
        // (see : https://github.com/sidorares/node-mysql2/blob/master/documentation/Extras.md) like it does for non-pooled ones.
        // So we're artificially keeping a second non-pooled connection just to format the query
        const sql = this.connection.format(...args);
        // console.log(sql);
    
        // But we're actually sending the prepared query to the pool
        return this.pool
          .promise()
          .query(sql)
          .then(([res]) => res);
      }
    
      async closeConnection() {
        return Promise.all([
          this.connection.promise().end(),
          this.pool.promise().end(),
          this.prisma.$disconnect(),
        ]);
      }
  }

  module.exports = new Database().init();

    
  