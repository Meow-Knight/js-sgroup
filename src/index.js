"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var cookie_parser_1 = require("cookie-parser");
var database_1 = require("./config/database");
var env_1 = require("./env");
var index_1 = require("./router/index");
var ROOT_DIR = process.cwd();
var PUBLIC_PATH = path_1.join(ROOT_DIR, 'public');
var VIEW_PATH = path_1.join(ROOT_DIR, 'views');
var app = express_1["default"]();
database_1["default"]();
app.set('view engine', 'pug');
app.set('views', VIEW_PATH);
app.use(cookie_parser_1["default"](env_1["default"].COOKIE_SECRET));
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].json());
app.use(function (req, res, next) {
    if (req.body._method) {
        req.method = req.body._method_method;
    }
    next();
});
app.use(express_1["default"].static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));
app.use('/', index_1["default"]);
app.listen(env_1["default"].PORT, function () {
    console.log("Server is listening on " + env_1["default"].PORT);
});
