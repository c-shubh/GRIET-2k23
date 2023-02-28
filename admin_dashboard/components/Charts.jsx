import BarGraph from "./BarGraph";

function getClassPies(attendanceLog) {
  let classPies = [];
  for (let klass of getClassIDsFromLog(attendanceLog)) {
    let periodIds = getPeriodIdsForClass(attendanceLog, klass);
    periodIds.forEach((e) => {
      classPies.push({
        classID: klass,
        data: getPieData(attendanceLog, klass, e),
      });
    });
  }
  console.log(classPies);
  return classPies;
}

function getPieData(attendanceLog, classID, periodId) {
  const studs = attendanceLog.filter(
    (e) => e.classID === classID && e.periodId === periodId
  );
  let present = 0;
  let absent = 0;
  studs.forEach((e) => {
    if (e.present) present++;
    else absent++;
  });

  return [present, absent];
}

function getPeriodIdsForClass(attendanceLog, classID) {
  return [
    ...new Set(
      attendanceLog.filter((e) => e.classID === classID).map((e) => e.periodId)
    ),
  ];
}

function getClassIDsFromLog(attendanceLog) {
  const set = new Set(attendanceLog.map((e) => e.classID));
  console.log([...set]);
  return [...set];
}

export default function Charts({ attendanceLog }) {
  return (
    <div>
      {getClassPies(attendanceLog).map((e) => {
        return (
          <div>
            <h3 style={{ textAlign: "center" }}>{e.classID}</h3>
            <BarGraph absent={e.data[1]} present={e.data[0]} />
          </div>
        );
      })}
    </div>
  );
}
