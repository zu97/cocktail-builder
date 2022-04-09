const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    displayName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
