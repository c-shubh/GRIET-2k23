const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  classId: { type: String, required: true },
  branch: { type: String, required: true },
  section: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
