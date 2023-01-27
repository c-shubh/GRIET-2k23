const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  try {
    let { type, id, currentPassword, updatedPassword } = req.body;
    type = type.toLowerCase();
    id = id.toLowerCase();

    const searchQuery = type === "student" ? { rollNo: id } : { teacherID: id };

    let data;
    if (type === "student") data = await Student.findOne(searchQuery);
    else data = await Teacher.findOne(searchQuery);

    var result = await bcrypt.compare(currentPassword, data.password);
    if (!result) {
      return res.status(401).json({ error: "Incorrect current password" });
    } else {
      let DB = type === "student" ? Student : Teacher;
      const updatedPasswordHash = await bcrypt.hash(updatedPassword, 10);
      await DB.updateOne(searchQuery, { $set: { password: updatedPasswordHash } });
      res.status(200).json({ msg: `successfully ${type} password changed` });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = { changePassword };
