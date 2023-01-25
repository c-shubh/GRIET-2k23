const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classID: {
    type: String,
    required: [true, "provide classID name"],
    unique: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  studentRollNumbers: {
    type: [String],
    required: [true, " must rollnumbers"],
    unique: true,
  },
  periodDays: {
    type: [[String]],
    required: [true],
  },
});

module.exports = mongoose.model("Class", classSchema);
