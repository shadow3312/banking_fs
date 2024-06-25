# A Full Stack Banking Web App using clean architecture

Add and manage different bank accounts effortlessly, transfer funds from bank to bank, leveraging the Plaid API and a scalable backend built on top of clean architecture.

I started this project because I wanted to test Plaid in a real life-like app. The <a href="https://plaid.com/docs/">docs</a> are great.

## Demo

Live <a href="https://zbanking.vercel.app">here</a>.

> The live demo uses Plaid sandbox environment, so there is no need to enter real bank accounts information. Instead, Plaid provides default bank accounts.

For testing purpose, you can choose `Chase` Bank with `Plaid Checking` and/or `Plaid Savings`

## Built with

- Backend (Clean architecture)
  - Typescript
  - Express
  - tRPC
- Frontend (web)
  - Typescript
  - Next.js 14
  - Recoil
  - Tailwind CSS

Check the <a href="https://github.com/shadow3312/banking_fs/tree/master/server">server README</a> and the <a href="https://github.com/shadow3312/banking_fs/tree/master/web">frontend README</a> for the whys.

## Running the project locally

```bash
git clone https://github.com/shadow3312/banking_fs.git
```

### Backend

#### Steps

- Navigate to the <a href="https://github.com/shadow3312/banking_fs/tree/master/server">server</a> folder

  ```bash
  cd server
  ```

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

### Web

#### Steps

- Navigate to the <a href="https://github.com/shadow3312/banking_fs/tree/master/web">web</a> folder

  ```bash
  cd web
  ```

- Install dependencies

  ```bash
  npm install
  ```

- Create a `.env` file, copy/paste the content from `.env.example` and update accordingly

  This needs to be set according to the validation schema available <a href="https://github.com/shadow3312/banking_fs/tree/master/web/src/env.js">here</a>. Otherwise, the project will fail to build

- Run the development server

  ```bash
  npm run dev
  ```

You're done.

### TODO:

Coming soon

- Android/iOs app

Feel free to clone, fork, star ⭐, report a bug or <a href="https://www.linkedin.com/in/euloge-amour/">get in touch</a>.

&copy; Shuruzer.
