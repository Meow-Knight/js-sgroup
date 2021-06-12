"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var updateHook_1 = require("./hook/updateHook");
var UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});
UserSchema.pre('save', updateHook_1.updateHook);
var UserModel = mongoose_1.model('user', UserSchema);
exports["default"] = UserModel;
