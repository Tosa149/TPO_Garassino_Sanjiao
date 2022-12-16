const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  message: String,
  status: String,
  horary: String,
  phone: Number,
  email: String,
});

module.exports = mongoose.model("SolicitudClase", Schema);
