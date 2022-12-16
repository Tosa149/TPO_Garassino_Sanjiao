const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  experience: String,
  description: String,
  classes: Array,
});

module.exports = mongoose.model("Profesor", Schema);
