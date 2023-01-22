const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide teacher name"],
  },
  teacherID: {
    type: String,
    required: [true, " must provide teacher id"],
    unique: true,
  },
  subject: {
    type: String,
    required: false,
  },
  periodIDs: {
    type: [[String]],
    required: true,
  },
});

module.exports = mongoose.model("teacher", teacherSchema);
