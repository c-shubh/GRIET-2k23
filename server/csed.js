function generatePeriodID(classID, subject) {
  return (
    classID +
    subject
      .replaceAll(" ", "") // remove spaces from any lab names
      .toLowerCase()
  );
}

const classID = "21csed";

const periodDays = [
  ["BACD", "OOPJ", "Break", "BEEE", "DSGT", "Lunch", "DSGT", "P&S"],
  ["P&S", "BEEE", "Break", "Python Theory", "BACD", "Lunch", "Python Lab"],
  ["DSGT", "OOPJ", "Break", "VA Lab", "Lunch", "BACD", "P&S"],
  ["OOPS Lab", "BEEE", "Lunch", "BACD", "DSGT"],
  ["BEEE", "OOPJ", "Break", "P&S", "BACD", "Lunch", "BEEE Lab (AC Sheds)"],
];

for (let periodDay of periodDays) {
  for (let subject of periodDay) {
    console.log(subject);
  }
}

const periods = [{}];
