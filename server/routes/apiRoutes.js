const express = require("express");
const router = express.Router();

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
router.post("/changePassword", debug);
router.post("/login", debug);
router.post("/submitAttendanceForClass", debug);

/* ---------------------------------- GET ----------------------------------- */
router.get("/changeAttendanceRequestByAdmin/:studentID/:periodID/:date/:newPresentValue", debug);
router.get("/getFacultyAttendanceHistoryData/:id", debug);
router.get("/getProfileDetails/:type/:id", debug);
router.get("/getScheduleStudent/:id", debug);
router.get("/getScheduleTeacher/:id", debug);
router.get("/getStudentAttendanceHistoryData/:id", debug);
router.get("/getStudentPercentage/:id", debug);

module.exports = router;
