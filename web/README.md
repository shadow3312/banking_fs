# Web Frontend

The frontend is built on top of Nextjs 14. Why ? Because Nextjs. It's just my go-to way when it comes to JS/TS frontend. And also because of its seamless implementation of server side rendering and the blessing that are server actions.

The communication with the backend is made using tRPC for end-to-end typesafety.

The banking part of the app uses Plaid as a funding source and Dwolla to manage funds transfer.

#### Steps to run

- Create a `.env` file, copy/paste the content from `.env.example` and update accordingly

  This needs to be set according to the validation schema available <a href="https://github.com/shadow3312/banking_fs/tree/master/web/src/env.js">here</a>. Otherwise, the project will fail to build

- Run the development server

  ```bash
  npm run dev
  ```

You're done.
