const mongoose = require("mongoose");
 

let Schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    name: String,
    surname: String,
    phone: Number,
    decryptPassword: String,
}) 

module.exports = mongoose.model("User", Schema) 