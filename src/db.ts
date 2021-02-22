import mysql from "mysql2";
import Env from "./env";

class Database {
  connectionOptions: {
    host: any;
    port: any;
    user: any;
    password: any;
    database: any;
    multipleStatements: boolean;
    namedPlaceholders: boolean;
  };

  connection: any;

  pool: any;

  prisma: any;

  init() {
    this.connectionOptions = {
      host: Env.DB_HOST,
      port: Env.DB_PORT,
      user: Env.DB_USER,
      password: Env.DB_PASS,
      database: Env.DB_NAME,
      multipleStatements: true,
      namedPlaceholders: true,
    };
    this.connection = mysql.createConnection(this.connectionOptions);
    this.pool = mysql.createPool(this.connectionOptions);

    return this;
  }

  async query(...args: any[]) {
    // unfortunatly, .format() on pooled connections does not seem to support named parameters
    // (see : https://github.com/sidorares/node-mysql2/blob/master/documentation/Extras.md) like it does for non-pooled ones.
    // So we're artificially keeping a second non-pooled connection just to format the query
    const sql = this.connection.format(...args);
    // console.log(sql);

    // But we're actually sending the prepared query to the pool
    return this.pool
      .promise()
      .query(sql)
      .then(([res]: any[]) => res);
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
