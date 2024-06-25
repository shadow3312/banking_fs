# Backend

The backend app is built using the clean architecture.

I choosed this architecture to isolate the business logic from any presentation technology. This let me, for instance, plug in an express server for the REST API while not tighly coupling it with the core business logic. So I could switch, if needed, for another presentation framework without affecting the business logic. And that's what I did.

REST is fun, but needing a strong type safety and the personal peace of mind that comes with it, I finally switched to tRPC to serve the data to the frontend. The clean architecture let me do this without ever touching neither the core business logic nor the previous express server logic.

#### Steps to run

- Install requirements

  ```bash
  npm install
  ```

- Create a `.env` file, copy/paste the content from `.env.example` and update accordingly

  P.S: This needs to be set according to the validation schema available <a href="https://github.com/shadow3312/banking_fs/tree/master/server/src/env.ts">here</a>. Otherwise, the project will fail to build

- Create a local database `banking`. The database name can be set <a href="https://github.com/shadow3312/banking_fs/tree/master/server/src/infrastructure/data/config/db.config.ts#L15">here</a>

  ```typescript
  development: {
      username: "root",
      password: "",
      database: "banking",
      host: "localhost",
      dialect: "mysql",
      logging: false,
  },
  ```

- Run integration tests

  The integration tests requires a test database, which can be set <a href="https://github.com/shadow3312/banking_fs/tree/master/server/src/infrastructure/data/config/db.config.ts#L7">here</a>

  ```typescript
  test: {
    username: "root",
    password: "",
    database: "banking_test",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  ```

  Run

  ```bash
  npm test
  ```

- Finally, launch the server

  ```bash
  npm run dev
  ```
