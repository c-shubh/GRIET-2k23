const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
  periodID: {
    type: String,
    required: [true, "provide periodID"],
  },
  TeacherID: {
    type: String,
    required: true,
  },
  classID: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now   
},
  endTime: {
    type: Date,
    required: true,
    // default: Date.now
  },
});

module.exports = mongoose.model("period", periodSchema);
