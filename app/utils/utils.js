function convertDateTimeIsoToTime(dateTimeIso) {
  const date = new Date(dateTimeIso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
export default convertDateTimeIsoToTime;
