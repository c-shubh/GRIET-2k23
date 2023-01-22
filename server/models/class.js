const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classID: {
    type: String,
    required: [true, "provide classID name"],
  },
  studentRollNumbers: {
    type: [String],
    required: [true, " must rollnumbers"],
    unique: true,
  },
  PeriodDays: {
    type: [[String]],
    required: [true],
  },
});

module.exports = mongoose.model("class", classSchema);
