const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const Class = require("./../models/class.js");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { type, id, currentPassword, updatedPassword } = req.body;
  const searchQuery = type === "Student" ? { rollNo: id } : { teacherID: id };
  let data;

  if (type === "Student") data = await Student.find(searchQuery);
  else data = await Teacher.find(searchQuery);
  console.log(data[0].password);
  const result = await bcrypt.compare(currentPassword, data[0].password);

  if (!result) {
    return res.status(401).json({ error: "Incorrect current password" });
  } else {
    const updatedPasswordhash = await bcrypt.hash(updatedPassword, 10);
    const currentPasswordhash = await bcrypt.hash(currentPassword, 10);
    console.log(updatedPasswordhash);
    if (type === "Student") {
      Student.updateOne(
        { password: currentPasswordhash },
        { $set: { password: updatedPasswordhash } },
        { new: true },
        (doc) => {
          res.send(doc);
        }
      );
    } else {
      Teacher.updateOne({ password: currentPasswordhash }, { $set: { password: updatedPasswordhash } }, () => {});
      res.status(200).json({ msg: "successfully teacher password changed" });
    }
  }
};
module.exports = { changePassword };
