const express = require("express");
const router = express.Router();

/* ---------------------------------- POST ---------------------------------- */
router.post("/changePassword", (req, res) => {});
router.post("/login", (req, res) => {});
router.post("/submitAttendanceForClass", (req, res) => {});

/* ---------------------------------- GET ----------------------------------- */
router.get("/changeAttendanceRequestByAdmin/:studentID/:periodID/:date/:newPresentValue", (req, res) => {});
router.get("/getFacultyAttendanceHistoryData/:id", (req, res) => {});
router.get("/getProfileDetails/:type/:id", (req, res) => {});
router.get("/getScheduleStudent/:id", (req, res) => {
  res.send("asdf");
});
router.get("/getScheduleTeacher/:id", (req, res) => {});
router.get("/getStudentAttendanceHistoryData/:id", (req, res) => {});
router.get("/getStudentPercentage/:id", (req, res) => {});

module.exports = router;
