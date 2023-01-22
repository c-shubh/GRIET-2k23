const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
  periodID: {
    type: String,
    required: [true, "provide periodID"],
    unique: true,
  },
  teacherID: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  classID: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: true,
    // default: Date.now
  },
});

module.exports = mongoose.model("Period", periodSchema);
