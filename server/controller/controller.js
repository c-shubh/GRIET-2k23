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
module.exports = {
  getScheduleTeacher,
};
