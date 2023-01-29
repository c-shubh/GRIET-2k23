/* ---------------------------------- Main ---------------------------------- */
const Teacher = require("./models/teacher");
async function a() {
  await Teacher.findOne({ teacherID: "griet01" });
}
a();
// rollNo: lowercase
const students = [{ rollNo: "21b81a1201", name: "Jack", classID: "21itb", branch: "IT", section: "B" }];

// class id: lowercase
const classes = [
  {
    id: "21itb",
    startYear: 2021,
    branch: "IT",
    section: "B",
    periodDays: [
      ["BEE", "BACD", "Break", "RDBMS", "OOPJ", "Lunch", "VA Lab"],
      ["RDBMS Lab", "BEE", "Lunch", "BACD", "OOPJ"],
      ["BEE", "P&S", "Break", "EEE Lab", "Lunch", "BACD"],
      ["P&S", "RDBMS", "Break", "OOPJ", "P&S", "Lunch", "Library"],
      ["OOPJ Lab", "OOPJ", "Lunch", "RDBMS", "P&S"],
    ],
    studentRollNumbers: [
      "21b81a1201",
      "21b81a1202",
      "21b81a1203",
      "21b81a1204",
      "21b81a1205",
      "21b81a1206",
      "21b81a1207",
      "21b81a1208",
      "21b81a1209",
      "21b81a1210",
    ],
  },
];

// teacher id: lowercase
const teachers = [
  {
    id: "griet01",
    name: "Vimala Devi",
    schedule: [
      ["21itb", "", "", "", "", ""],
      ["", "", "", "21itb", "", ""],
      ["21itb", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ],
  },
];

console.log(JSON.stringify(teachers));

// period id: lowercase
const periods = [
  { periodID: "21itbbacd", subject: "BACD", classID: "21itb", teacherID: "griet01", length: 1 },
  { periodID: "21itbbee", subject: "BEE", classID: "21itb", teacherID: "griet01", length: 1 },
  { periodID: "21itbeeelab", subject: "EEE Lab", classID: "21itb", teacherID: "griet01", length: 3 },
  { periodID: "21itblibrary", subject: "Library", classID: "21itb", teacherID: "griet01", length: 1 },
  { periodID: "21itboopj", subject: "OOPJ", classID: "21itb", teacherID: "griet01", length: 1 },
  { periodID: "21itboopjlab", subject: "OOPJ Lab", classID: "21itb", teacherID: "griet01", length: 3 },
  { periodID: "21itbp&s", subject: "P&S", classID: "21itb", teacherID: "griet01", length: 1 },
  { periodID: "21itbrdbms", subject: "RDBMS", classID: "21itb", teacherID: "griet01", length: 1 },
  { periodID: "21itbrdbmslab", subject: "RDBMS Lab", classID: "21itb", teacherID: "griet01", length: 3 },
  { periodID: "21itbvalab", subject: "VA Lab", classID: "21itb", teacherID: "griet01", length: 2 },
];
