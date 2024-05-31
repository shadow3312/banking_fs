const dbConfig: IDbConfig = {
  test: {
    username: "root",
    password: "",
    database: "banking_test",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  development: {
    username: "root",
    password: "",
    database: "banking",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: "root",
    password: "sikoyod1234",
    database: "banking",
    host: "127.0.0.1",
    dialect: "mariadb",
    logging: false,
  },
};

export default dbConfig;
