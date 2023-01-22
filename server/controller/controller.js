const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const Class = require("./../models/class.js");

const getScheduleTeacher = async (req, res) => {
  try {
    const info = await Teacher.find(req.params);
    res.status(201).json({ data: info });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const changePassword = async (req, res) => {
  const { type, id, currentPassword, updatedPassword } = req.body;
  const searchQuery = type === "Student" ? { rollNo: id } : { teacherID: id };
  let data;
  if (type === "Student") data = await Student.find(searchQuery);
  else data = await Teacher.find(searchQuery);

  try {
    if (req.body.currentPassword === data[0].password) {
      if (type === "Student") {
        Student.updateOne({ password: currentPassword }, { $set: { password: updatedPassword } }, () => {});
        res.status(200).json({ msg: "successfully student password changed" });
      } else {
        Teacher.updateOne({ password: currentPassword }, { $set: { password: updatedPassword } }, () => {});
        res.status(200).json({ msg: "successfully teacher password changed" });
      }
    } else {
      res.status(301).json({ msg: "incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  getScheduleTeacher,
  changePassword,
};
