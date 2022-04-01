const database = process.env.DB_NAME || "test";
const username = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "localhost";
const driver = process.env.DB_DRIVER || "mysql";

module.exports = {
    database,
    username,
    password,
    host,
    driver
}