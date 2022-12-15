const mongoose = require("mongoose");


let Schema = new mongoose.Schema({
    profesorId: mongoose.Schema.Types.ObjectId,
    subject: String,
    name: String,
    type: String,
    frecuency: String,
    duration: Number,
    rating: Array,
    description: String,
    comments: Array,
    price: Number,
    public: Boolean, 
}) 

module.exports = mongoose.model("Class", Schema) 