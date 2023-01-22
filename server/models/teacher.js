const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide teacher name"],
  },
  password: {
    type: String,
    required: true,
  },
  teacherID: {
    type: String,
    required: [true, " must provide teacher id"],
    unique: true,
  },
  periodIDs: {
    type: [[String]],
    required: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
