const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { type, id, currentPassword, updatedPassword } = req.body;
  const searchQuery = type === "Student" ? { rollNo: id } : { teacherID: id };

  let data;
  if (type === "Student") data = await Student.find(searchQuery);
  else data = await Teacher.find(searchQuery);

  var result = await bcrypt.compare(currentPassword, data[0].password);
  console.log(data);
  if (!result) {
    return res.status(401).json({ error: "Incorrect current password" });
  } else {
    let DB = type === "Student" ? Student : Teacher;
    const updatedPasswordhash = await bcrypt.hash(updatedPassword, 10);
    DB.updateOne(searchQuery, { $set: { password: updatedPasswordhash } }, (err, doc) => {});
    res.status(200).json({ msg: "successfully teacher password changed" });
  }
};

module.exports = { changePassword };
