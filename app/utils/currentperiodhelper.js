import subtractTime from "../utils/subtracttime";
function currentPeriodHelper(dateTimeIso) {
  const date = new Date(dateTimeIso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const a = subtractTime(`${hours}:${minutes}:${seconds}`);
  return removeSeconds(a);
}

function removeSeconds(time) {
  var timeWithoutSeconds = time.split(":").slice(0, 2).join(":");
  return timeWithoutSeconds;
}

export default currentPeriodHelper;
