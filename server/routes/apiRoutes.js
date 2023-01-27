const express = require("express");
const router = express.Router();

const {
  getClassStudentRollNos,
  getProfileDetails,
  getScheduleStudent,
  getScheduleTeacher,
  submitAttendanceForClass,
  getStudentPercentage,
  getFacultyAttendanceHistoryData,
} = require("./../controller/controller");
const { changePassword } = require("./../controller/changePassword.controller.js");
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

router.post("/submitAttendanceForClass", submitAttendanceForClass);

/* ---------------------------------- GET ----------------------------------- */
router.get("/changeAttendanceRequestByAdmin/:studentID/:periodID/:date/:newPresentValue", debug);
router.get("/getFacultyAttendanceHistoryData/:id", getFacultyAttendanceHistoryData);
router.get("/getStudentAttendanceHistoryData/:id", debug);
router.get("/getStudentPercentage/:id", getStudentPercentage);

router.get("/getClassStudentRollNos/:classID", getClassStudentRollNos);
router.get("/getProfileDetails/:type/:id", getProfileDetails);
router.get("/getScheduleStudent/:id", getScheduleStudent);
router.get("/getScheduleTeacher/:teacherID", getScheduleTeacher);

module.exports = router;
