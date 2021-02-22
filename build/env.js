require("dotenv").config();
function getEnv(variable) {
    var value = process.env[variable];
    if (typeof value === "undefined") {
        console.warn("Seems like the variable \"" + variable + "\" is not set in the environment. \n    Did you forget to execute \"cp .env.sample .env\" and adjust variables in the .env file to match your own environment ?");
    }
    return value;
}
var SERVER_PORT = getEnv("SERVER_PORT");
var DB_HOST = getEnv("DB_HOST");
var DB_PORT = getEnv("DB_PORT");
var DB_USER = getEnv("DB_USER");
var DB_PASS = getEnv("DB_PASS");
var DB_NAME = getEnv("DB_NAME");
var JWT_PRIVATE_KEY = getEnv("JWT_PRIVATE_KEY");
var JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN");
module.exports = {
    SERVER_PORT: SERVER_PORT,
    DB_HOST: DB_HOST,
    DB_PORT: DB_PORT,
    DB_USER: DB_USER,
    DB_NAME: DB_NAME,
    DB_PASS: DB_PASS,
    JWT_PRIVATE_KEY: JWT_PRIVATE_KEY,
    JWT_EXPIRES_IN: JWT_EXPIRES_IN,
};
//# sourceMappingURL=env.js.map