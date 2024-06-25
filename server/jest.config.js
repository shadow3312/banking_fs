/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@/serverEnv": "<rootDir>/src/env.ts",
    "@/(.*)": "<rootDir>/src/$1",
    "~/(.*)": "<rootDir>/__test__/fixtures/$1",
  },
};
