const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginHandler = async (req, res) => {
  try {
    const { type, id, password } = req.body;
    const searchQuery = type === "Student" ? { rollNo: id } : { teacherID: id };

    let data;
    if (type === "Student") data = await Student.findOne(searchQuery);
    else data = await Teacher.findOne(searchQuery);

    const passwordHash = data.password;
    bcrypt.compare(password, passwordHash, (err, result) => {
      if (err) {
        res.status(401).json({
          msg: "Auth failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            userId: data.id,
            type: type,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "5h",
          }
        );
        return res.status(200).json({ status: "true", msg: "login successful", token: token });
      } else {
        res.status(400).json({ status: "false", msg: "login failed" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};
module.exports = { loginHandler };
