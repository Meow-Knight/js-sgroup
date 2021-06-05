const {model, Schema} = require('mongoose');

const SessionSchema = new Schema({
    user: {
        _id: String,
        username: String,
    },
    lock: {
        type: String,
    }
});

const SessionModel = model('session', SessionSchema);

module.exports = SessionModel;