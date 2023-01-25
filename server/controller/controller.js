/* -------------------------------- Requires -------------------------------- */

const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const Class = require("./../models/class.js");
const Period = require("./../models/period.js");
const { generatePeriodID, studentNotFound, classNotFound, periodNotFound, teacherNotFound } = require("../utils");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
// eslint-disable-next-line no-unused-vars
const Query = require("mongoose").Query;

/* ------------------------------- Functions -------------------------------- */

async function getStudentDetails(req, res) {
  const rollNo = req.params.id.toLowerCase();
  const /** @type{Query} */ student = await Student.findOne({ rollNo: rollNo });
  if (!student) studentNotFound(req, res);
  res.json({
    rollNo: rollNo.toUpperCase(), // rollNo is to be displayed in uppercase
    name: student.name,
    branch: student.branch,
    section: student.section,
    year: dayjs().year() - dayjs(rollNo.substring(0, 2), "YY").year(),
  });
}

async function getTeacherDetails(req, res) {
  const teacherID = req.params.id.toLowerCase();
  const /** @type{Query} */ teacher = await Teacher.findOne({ teacherID: teacherID });
  if (!teacher) teacherNotFound(teacherID, res);
  if (!teacher) teacherNotFound(req, res);
  res.json({
    teacherID: teacherID,
    name: teacher.name,
  });
}

async function getProfileDetails(req, res) {
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
}

const getScheduleTeacher = async (req, res) => {
  try {
    const { name, periodIDs, teacherID } = await Teacher.findOne(req.params);
    if (periodIDs) {
      const teacherSchedule = {
        monday: periodIDs[0],
        tuesday: periodIDs[1],
        wednesday: periodIDs[2],
        thursday: periodIDs[3],
        friday: periodIDs[4],
        saturday: periodIDs[5],
      };

      if (teacherSchedule) {
        res.status(201).json({ name: name, teacherID: teacherID, schedule: teacherSchedule });
      } else {
        res.status(400).json({ msg: "schedule not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

async function getScheduleStudent(req, res) {
  const rollNo = req.params.id.toLowerCase();

  const /** @type{Query} */ student = await Student.findOne({ rollNo: rollNo });
  if (!student) studentNotFound(rollNo, res);

  const /** @type{Query} */ studentClass = await Class.findOne({ classID: student.classID });
  if (!studentClass) classNotFound(student.classID, res);

  // monday: 0, ... sunday: 6
  const dayOfWeek = (dayjs().day() - 1) % 7;
  const /** @type{Array<string> } */ periods = studentClass.periodDays[dayOfWeek];

  // start time 9:00 am
  let time = dayjs().startOf("date").hour(9).minute(0);
  let toReturn = [];

  for (const subject of periods) {
    toReturn.push({ subject: subject, start: time.toDate() });

    if (subject === "Break") {
      time = time.add(10, "minute");
    } else if (subject === "Lunch") {
      time = time.add(45, "minute");
    } else {
      const periodID = generatePeriodID(student.classID, subject);
      const period = await Period.findOne({ periodID: periodID });
      if (!period) periodNotFound(periodID, res);
      time = time.add(period.get("length"), "hour");
    }
  }

  res.json(toReturn);
}

module.exports = {
  getProfileDetails,
  getScheduleTeacher,
  getScheduleStudent,
};
