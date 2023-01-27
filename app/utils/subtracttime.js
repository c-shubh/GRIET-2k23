function subtractTime(time) {
  let [hours, minutes, seconds] = time.split(":").map((val) => parseInt(val));
  minutes -= 30;
  hours -= 5;

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
export default subtractTime;
