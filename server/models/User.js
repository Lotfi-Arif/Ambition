const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const passportLocalMongoose = require("passport-local-mongoose");
const crypto = require('crypto');


const UserSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    email: String,
    password: String,
    address: String,
    phoneNo: String,
    salt: String
}, { timestamps: true })

// UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });
UserSchema.plugin(passportLocalMongoose);

// UserSchema.methods.validPassword = function(pswd) {
//     const password = crypto.pbkdf2Sync(pswd, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.password === password;
// };

// UserSchema.methods.setPassword = function(pswd) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.password = crypto.pbkdf2Sync(pswd, this.salt, 10000, 512, 'sha512').toString('hex');
// };

module.exports = mongoose.model('User', UserSchema);