const mongoose = require("mongoose");

const attendanceLogSchema = new mongoose.Schema({
  studentRollNo: {
    type: String,
    required: true,
  },
  periodID: {
    type: String,
    required: [true, "provide periodID"],
  },
  teacherID: {
    type: String,
    required: [true, " must provide teacher id"],
  },
  classID: {
    type: String,
    required: [true, "provide classID name"],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  present: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("AttendanceLog", attendanceLogSchema);
