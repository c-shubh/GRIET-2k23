function getCurrentWeekday() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  return days[currentDate.getUTCDay()];
}
export default getCurrentWeekday;
