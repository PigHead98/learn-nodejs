const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    image: String,
    email: String,
    password: String
});

let User = mongoose.model('user',userSchema, 'users');

module.exports = User;