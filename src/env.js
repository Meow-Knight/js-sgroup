"use strict";
exports.__esModule = true;
require('dotenv').config();
var envConfig = {
    PORT: process.env.PORT,
    DB_CONNECTION: process.env.DB_CONNECTION,
    COOKIE_SECRET: process.env.COOKIE_SECRET
};
exports["default"] = envConfig;
