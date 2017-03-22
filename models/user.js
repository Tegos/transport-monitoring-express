var crypto = require('crypto'),
    mongoose = require('../utils/apiUrl'),
    Schema = mongoose.Schema,
    async = require('async');

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

User.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

User.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', User);