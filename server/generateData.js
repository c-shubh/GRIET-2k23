const { faker } = require("@faker-js/faker");

for (let i = 1; i <= 64; i++) {
  const name = faker.name.fullName();
  const branch = "IT";
  const rollNo = "21B81A12" + (i < 10 ? `0${i}` : i);
  const password = rollNo;
  const section = "A";
  const classID = rollNo.substring(0, 2) + branch + section;
  console.log([name, branch, rollNo, password, section, classID].join(","));
}
