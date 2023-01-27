/* -------------------------------- Requires -------------------------------- */

const Student = require("./../models/student.js");
const AttendanceLog = require("./../models/attendancelog.js");
const Teacher = require("./../models/teacher.js");
const Class = require("./../models/class.js");
const Period = require("./../models/period.js");
const { generatePeriodID, studentNotFound, classNotFound, periodNotFound, teacherNotFound } = require("../utils");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const { json } = require("express");
dayjs.extend(customParseFormat);
// eslint-disable-next-line no-unused-vars
const Query = require("mongoose").Query;

/* ------------------------------- Functions -------------------------------- */

function getDayOfWeek() {
  // monday: 0, ... sunday: 6
  // friday (hardcoded because can't test the app on saturday (holiday))
  return 4;
  return (dayjs().day() - 1) % 7;
}

async function getStudentDetails(req, res) {
  try {
    const rollNo = req.params.id.toLowerCase();
    const student = await Student.findOne({ rollNo: rollNo });
    if (student) {
      res.json({
        rollNo: rollNo.toUpperCase(), // rollNo is to be displayed in uppercase
        name: student.name,
        branch: student.branch,
        section: student.section,
        year: dayjs().year() - dayjs(rollNo.substring(0, 2), "YY").year(),
      });
    } else {
      studentNotFound(rollNo, res);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
  return;
}

async function getTeacherDetails(req, res) {
  try {
    const teacherID = req.params.id.toLowerCase();
    const teacher = await Teacher.findOne({ teacherID: teacherID });
    if (teacher) {
      res.json({
        teacherID: teacherID,
        name: teacher.name,
      });
    } else {
      teacherNotFound(teacherID, res);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
  return;
}

async function getProfileDetails(req, res) {
  try {
    let type = req.params.type.toLowerCase();
    switch (type) {
      case "student":
        getStudentDetails(req, res);
        break;
      case "teacher":
        getTeacherDetails(req, res);
        break;
      default:
        res.status(400).json({ error: `invalid type ${type}` });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}

async function getScheduleTeacher(req, res) {
  try {
    const teacherID = req.params.teacherID.toLowerCase();
    const teacher = await Teacher.findOne({ teacherID: teacherID });
    if (teacher) {
      const dayOfWeek = getDayOfWeek();
      const /** @type{Array<string> } */ periods = teacher.periodIDs[dayOfWeek];

      const classSchedules = [];
      for (const classID of periods) {
        classSchedules.push(...(await getClassSchedule(classID, null)));
      }

      res.json(classSchedules.filter((classSchedule) => classSchedule.teacherID === teacherID).sort((a, b) => b - a));
    } else {
      teacherNotFound(teacherID, res);
      return;
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}

async function getClassSchedule(classID, res) {
  try {
    const studentClass = await Class.findOne({ classID: classID });
    if (studentClass) {
      // monday: 0, ... sunday: 6
      const dayOfWeek = getDayOfWeek();
      const /** @type{Array<string> } */ periods = studentClass.periodDays[dayOfWeek];

      // start time 9:00 am
      let time = dayjs().startOf("date").hour(9).minute(0);
      let toReturn = [];

      for (let i = 0; i < periods.length; i++) {
        const subject = periods[i];
        toReturn.push({
          subject: subject,
          start: time.toDate(),
          branch: studentClass.branch,
          classID: classID,
          section: studentClass.section,
        });

        if (subject === "Break") {
          time = time.add(10, "minute");
        } else if (subject === "Lunch") {
          time = time.add(45, "minute");
        } else {
          const periodID = generatePeriodID(classID, subject);
          const period = await Period.findOne({ periodID: periodID });
          if (period) {
            toReturn[i].teacherID = period.teacherID;
            toReturn[i].periodID = period.periodID;

            const periodLength = period.get("length");
            time = time.add(periodLength, "hour");
            if (i <= 1 && periodLength >= 2) {
              time = time.add(10, "minute"); // since this lab covers break
            }
          } else {
            periodNotFound(periodID, res);
            return;
          }
        }
      }
      if (res === null) return toReturn;
      else res.json(toReturn);
    } else {
      if (res === null) {
        return null;
      } else {
        classNotFound(classID, res);
      }
      return;
    }
  } catch (err) {
    if (res !== null) res.status(500).json({ error: err.toString() });
  }
}

async function getScheduleStudent(req, res) {
  try {
    const rollNo = req.params.id.toLowerCase();
    const student = await Student.findOne({ rollNo: rollNo });
    if (student) {
      return getClassSchedule(student.classID, res);
    } else {
      studentNotFound(rollNo, res);
      return;
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}

async function getClassStudentRollNos(req, res) {
  try {
    const classID = req.params.classID.toLowerCase();
    const klass = await Class.findOne({ classID: classID });
    if (klass) {
      res.json(klass.studentRollNumbers);
    } else {
      classNotFound(classID, res);
      return;
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}

function submitAttendanceForClass(req, res) {
  try {
    const { periodID, teacherID, classID, date, studentRollNumbers } = req.body;
    const attendanceLogs = [];
    for (let rollNo in studentRollNumbers) {
      attendanceLogs.push({
        date,
        periodID,
        teacherID,
        classID,
        studentRollNo: rollNo,
        present: studentRollNumbers[rollNo],
      });
    }
    console.log(attendanceLogs.length);
    AttendanceLog.insertMany(attendanceLogs, function (err, docs) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ msg: "saved attendance successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}

const getStudentPercentage = async (req, res) => {
  // console.log(req.params);
  let attented = await AttendanceLog.find({ studentRollNo: req.params.id, present: true });
  attented = attented.length;
  let notattented = await AttendanceLog.find({ studentRollNo: req.params.id, present: false });
  notattented = notattented.length;
  if (attented == 0 && notattented == 0) {
    res.json({ msg: `attendance log not found for user ${req.params.id}` });
  }
  const attendanceperc = (attented / (attented + notattented)) * 100;
  res.status(201).json(attendanceperc);
};

const getFacultyAttendanceHistoryData = async (req, res) => {
  console.log(req.params);
  res.status(201).json({ msg: "working" });
};

module.exports = {
  getClassStudentRollNos,
  getProfileDetails,
  getScheduleStudent,
  getScheduleTeacher,
  getStudentPercentage,
  submitAttendanceForClass,
  getFacultyAttendanceHistoryData,
};
