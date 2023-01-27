import subtractTime from "../utils/subtracttime";
function convertDateTimeIsoToTime(dateTimeIso) {
  const date = new Date(dateTimeIso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const a = subtractTime(`${hours}:${minutes}:${seconds}`);
  return convertTo12Hour(a);
}
function convertTo12Hour(time) {
  let [hours, minutes, seconds] = time.split(":").map((val) => parseInt(val));
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}




export default convertDateTimeIsoToTime;
