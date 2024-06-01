type Dialect =
  | "mysql"
  | "mariadb"
  | "postgres"
  | "sqlite"
  | "mssql"
  | "db2"
  | "snowflake"
  | "oracle";

interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean;
}

interface IDbConfig {
  test: IConfig;
  development: IConfig;
  production: IConfig;
}

type Environment = keyof IDbConfig;
