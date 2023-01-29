const bcrypt = require("bcrypt");
const a = [
  {
    name: "Mr. Shakeel Ahmed",
    periodIDs: [["21ita"], ["21ita"], ["21ita"], [""], [""]],
    teacherID: "griet01",
    password: "$2b$10$1rLFDdxIeDPAojsGUsHBvu3r1H/SdzNTvJL0OgbPJQ/L3uqx/P6Re",
  },
  {
    name: "Mr. B. Sateesh Kumar",
    periodIDs: [["21ita"], ["21ita"], [""], ["21ita"], ["21ita"]],
    teacherID: "griet02",
    password: "$2b$10$3X9i5a3uyfc8POs1zjluj.Fr9N.v2I/oaRQGT2OMWFb5iTkg5iEc.",
  },
  {
    name: "Mrs. G Sunitha Rekha",
    periodIDs: [["21ita"], ["21ita"], [""], ["21ita"], ["21ita"]],
    teacherID: "griet03",
    password: "$2b$10$2Z22EDiw6rmnZpRCfjjuU.YXdQwsEcYBOcj86SdHlVzMmItDuyZfC",
  },
  {
    name: "Mrs. V. Vimala Devi",
    periodIDs: [["21csed", "21ita"], ["21csed", "21ita"], ["21ita"], ["21csed"], ["21csed"]],
    teacherID: "griet04",
    password: "$2b$10$dI1IG9zHjrnyN5yBq.foMulQNsqtOOL88HeTHk.pi8LpbbbfBR5Q6",
  },
  {
    name: "Mrs. D. Anusha",
    periodIDs: [[""], [""], ["21ita"], ["21ita"], ["21ita"]],
    teacherID: "griet05",
    password: "$2b$10$r7FXzVSgj5wOeGPNGXzxi.HYbWS8YdFIZC2Z6yelqcIyqyt0kCZSy",
  },
  {
    name: "Dr. J.J.B. Vijayvardhan",
    periodIDs: [["21ita"], [""], [""], [""], [""]],
    teacherID: "griet06",
    password: "$2b$10$8i53Lnq7xVbRo1.h.Ae9WeBclR/esPvXhIUQcSg1V9LyBBO/3sqvW",
  },
  {
    name: "Dr. A. Vani Vathsala",
    periodIDs: [["21,csed"], [""], ["21csed"], ["21csed"], ["21csed"]],
    teacherID: "griet07",
    password: "$2b$10$id41ZaSH3uc.0zqhloOBJeXX4PBuZH/WZVk.vbrvceVu1vbg243a6",
  },
  {
    name: "Mrs. Shaik Farhana",
    periodIDs: [["DSGT"], [""], ["DSGT"], ["DSGT"], [""]],
    teacherID: "griet08",
    password: "$2b$10$LN/HNSDdViykajLBPBATNOZWr6NqZYRkLYDSduzBc2ZpTCs06D/de",
  },
  {
    name: "Ms. M. Archana",
    periodIDs: [["12csed"], ["12csed"], ["12csed"], ["12csed"], ["12csed"]],
    teacherID: "griet09",
    password: "$2b$10$jYKhzA.lT9hD0rPTfHAjTuUIm.REkD.dNhXqy8XzCQ9f6uHeVjbjG",
  },
  {
    name: "Mr. B.N.N. Uma Shankar",
    periodIDs: [["12csed"], ["12csed"], ["12csed"], [""], ["12csed"]],
    teacherID: "griet10",
    password: "$2b$10$aPBXdzd8AkJ7xf132UgPWOkRiSNbi1DJ3ye6Puy7w7hNImV608sv.",
  },
  {
    name: "Ms. Y. Sunitha",
    periodIDs: [[""], ["12csed"], [""], [""], [""]],
    teacherID: "griet11",
    password: "$2b$10$trl67YmbBXHOgnlVabIlcOuls/U3AxGKLSVeCDjfbi8zZ1q2mDVFC",
  },
  {
    name: "Ms. Swapna",
    periodIDs: [["21csitb"], [""], ["21csitb"], ["21csitb"], ["21csitb"]],
    teacherID: "griet12",
    password: "$2b$10$vbkDcGZmcAX7C6UROROGje7ShxRoh5lLxBxcEnERfiZQNcmOi.5uu",
  },
  {
    name: "Mrs. HN Lakshmi",
    periodIDs: [["21csitb"], ["21csitb"], ["21csitb"], ["21csitb"], ["21csitb"]],
    teacherID: "griet13",
    password: "$2b$10$kCUlhtphu3dYHK6Hm1lPyuU30OAF4kMN/9ngZdtf3ZmYBAMytSi4C",
  },
  {
    name: "Ms. Lakshmi",
    periodIDs: [["21csitb"], ["21csitb"], [""], [""], ["21csitb"]],
    teacherID: "griet14",
    password: "$2b$10$FbK8zX46Z8EtZMMqPp6YE.tZSM5OTfmUGdvLKy3FplL.OJIT7QpKu",
  },
  {
    name: "Dr. Nikita",
    periodIDs: [["21csitb"], ["21csitb"], [""], ["21csitb"], ["21csitb"]],
    teacherID: "griet15",
    password: "$2b$10$taA7qh28KoTN0kb69.Gxw.Rq2wHrdDQTDYl1KJ9kN8mFGeHm0n0uS",
  },
  {
    name: "Mrs. Rani",
    periodIDs: [[""], ["21csitb"], ["21csitb"], [""], ["21csitb"]],
    teacherID: "griet16",
    password: "$2b$10$nBgh10VdjuJsJgJQfKH57.e/pRtLHePvUUuyoClOjcrRVe50ZJ4hK",
  },
  {
    name: "Dr. Charita",
    periodIDs: [[""], ["21csitb"], [""], [""], [""]],
    teacherID: "griet17",
    password: "$2b$10$YXJ/wVjLQ.w4Oh.C7h/3c.psVcxJumOvLhGIU/5khXeZyE4iAbJLi",
  },
  {
    name: "Mr. Venkateshwar",
    periodIDs: [[""], [""], ["21csitb"], [""], [""]],
    teacherID: "griet18",
    password: "$2b$10$/WUOcVoiwAi8x5/nXsJvQ.yUk87IdMWEoSWSpvlpQWKf3cNr5aHi.",
  },
  {
    name: "Mr. Ramu",
    periodIDs: [[""], [""], ["21csitb"], [""], [""]],
    teacherID: "griet19",
    password: "$2b$10$SVdctPkAecV133qNTG2HrutfPvRxt.q9GVfANOfksNj4MBZ1dC5xK",
  },
  {
    name: "Library sir",
    periodIDs: [[""], [""], [""], ["21ita"], ["21csitb"]],
    teacherID: "griet20",
    password: "$2b$10$9BZvZqAaN2wG4fc.FDrvau30takBU2XK8Rc4wdxXrvKB9sbltRJp.",
  },
  {
    name: "Ms. S. Shabeena Bhanu",
    periodIDs: [[""], [""], ["21csed"], [""], [""]],
    teacherID: "griet21",
    password: "$2b$10$NmquRH37kcCjh9JU2qf0GuhPD7ShNcDvHm9qXF4LSBFbkM.BJmG92",
  },
];
let i = 1;
for (let teacher of a) {
  teacher.teacherID = "griet" + (i < 10 ? "0" + i : i);
  teacher.password = bcrypt.hashSync(teacher.teacherID, 10);
  i++;
}
console.log(JSON.stringify(a));
