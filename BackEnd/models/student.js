const mongoose = require("mongoose");


let Schema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    birthday: Date,
    classes: Array,
    studies: {
        primary: Boolean,
        secondary: Boolean,
        third: Boolean,
        university: Boolean,
    }
}) 

module.exports = mongoose.model("Student", Schema) 