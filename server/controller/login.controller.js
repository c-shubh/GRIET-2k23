const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const bcrypt = require("bcrypt");

const loginHandler = async (req, res) => {
  const { type, id, password } = req.body;
  const searchQuery = type === "Student" ? { rollNo: id } : { teacherID: id };
  
  let data;
  if (type === "Student") data = await Student.find(searchQuery);
  else data = await Teacher.find(searchQuery);
  
  const passwordHash = data[0].password;
  const result = await bcrypt.compare(password, passwordHash);
  if (!result) {
    res.status(401).json({ status: "false", msg: "incorrect password" });
  } else {
    res.status(201).json({ status: "true", msg: "login successfull" });
  }
};
module.exports = { loginHandler };
