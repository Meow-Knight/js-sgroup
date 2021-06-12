"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var SessionSchema = new mongoose_1.Schema({
    user: {
        _id: String,
        username: String
    },
    expired: Number,
    renewTime: Number // Check if user is no longer working in that session
});
var SessionModel = mongoose_1.model('session', SessionSchema);
exports["default"] = SessionModel;
