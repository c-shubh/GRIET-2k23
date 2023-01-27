/**
 *
 * @param {string} classID
 * @param {string} subject
 * @returns {string}
 */
function generatePeriodID(classID, subject) {
  return (
    classID +
    subject
      .replaceAll(" ", "") // remove spaces from any lab names
      .toLowerCase()
  );
}

function studentNotFound(rollNo, res) {
  res.status(404).json({ error: `student ${rollNo} not found` });
}

function teacherNotFound(teacherID, res) {
  res.status(404).json({ error: `teacher ${teacherID} not found` });
}

function classNotFound(classID, res) {
  res.status(404).json({ error: `class ${classID} not found` });
}

function periodNotFound(periodID, res) {
  res.status(404).json({ error: `period ${periodID} not found` });
}

module.exports = {
  classNotFound,
  generatePeriodID,
  periodNotFound,
  studentNotFound,
  teacherNotFound,
};
