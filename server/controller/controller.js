const Student = require("./../models/student.js");
const Teacher = require("./../models/teacher.js");
const Class = require("./../models/class.js");

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

const getScheduleStudent = async (req, res) => {
  try {
    const searchQuery = { rollNo: req.params.id };
    const studentinfo = await Student.findOne(searchQuery);

    if (!studentinfo) {
      res.status(400).json({ msg: "student information not found" });
    } else {
      let { classID, name } = studentinfo;
      const { periodDays } = await Class.findOne({ classID: classID });
      if (periodDays) {
        const Schedule = {
          monday: periodDays[0],
          tuesday: periodDays[1],
          wednesday: periodDays[2],
          thursday: periodDays[3],
          friday: periodDays[4],
          saturday: periodDays[5],
        };
        res.status(200).json({ name: name, classID: classID, schedule: Schedule });
      } else {
        res.status(400).json({ msg: "schedule not found " });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
module.exports = {
  getScheduleTeacher,
  getScheduleStudent,
};
