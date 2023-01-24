const express = require("express");
const router = express.Router();

const { getScheduleTeacher, getScheduleStudent } = require("./../controller/controller");
const { changePassword } = require("./../controller/changepassword.controller.js");
const { loginHandler } = require("./../controller/login.controller");

function debug(req, res) {
  switch (req.method) {
    case "GET":
      console.log(req.query);
      res.send(req.params);
      break;
    case "POST":
      res.send(req.body);
      break;
    default:
      req.send("");
      break;
  }
}

/* ---------------------------------- POST ---------------------------------- */
router.post("/changePassword", changePassword);
router.post("/login", loginHandler);
router.post("/submitAttendanceForClass", debug);

/* ---------------------------------- GET ----------------------------------- */
router.get("/changeAttendanceRequestByAdmin/:studentID/:periodID/:date/:newPresentValue", debug);
router.get("/getFacultyAttendanceHistoryData/:id", debug);
router.get("/getProfileDetails/:type/:id", debug);
router.get("/getScheduleStudent/:id", getScheduleStudent);
router.get("/getScheduleTeacher/:teacherID", getScheduleTeacher);
router.get("/getStudentAttendanceHistoryData/:id", debug);
router.get("/getStudentPercentage/:id", debug);

module.exports = router;
