require("dotenv").config();

function getEnv(variable) {
  const value = process.env[variable];
  if (typeof value === "undefined") {
    console.warn(`Seems like the variable "${variable}" is not set in the environment. 
    Did you forget to execute "cp .env.sample .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}

const SERVER_PORT = getEnv("SERVER_PORT");

const DB_HOST = getEnv(`DB_HOST`);
const DB_PORT = getEnv(`DB_PORT`);
const DB_USER = getEnv(`DB_USER`);
const DB_PASS = getEnv(`DB_PASS`);
const DB_NAME = getEnv(`DB_NAME`);

const DB_HOST_22 = getEnv(`DB_HOST_22`);
const DB_PORT_22 = getEnv(`DB_PORT_22`);
const DB_USER_22 = getEnv(`DB_USER_22`);
const DB_PASS_22 = getEnv(`DB_PASS_22`);
const DB_NAME_22 = getEnv(`DB_NAME_22`);

const JWT_PRIVATE_KEY = getEnv(`JWT_PRIVATE_KEY`);
const JWT_EXPIRES_IN = getEnv(`JWT_EXPIRES_IN`);

module.exports = {
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASS,

  DB_HOST_22,
  DB_PORT_22,
  DB_USER_22,
  DB_NAME_22,
  DB_PASS_22,

  JWT_PRIVATE_KEY,
  JWT_EXPIRES_IN,
};
