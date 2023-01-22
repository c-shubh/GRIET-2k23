const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  classID: { type: String, required: true },
  branch: { type: String, required: true },
  section: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
