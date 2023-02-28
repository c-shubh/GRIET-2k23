export function findCurrentPeriod(periods) {
  let currentPeriodIndex = -1;
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let currentTimeInMinutes = currentHour * 60 + currentMinute;
  for (let i = 0; i < periods.length; i++) {
    let periodStartTime = periods[i].split(":");
    let periodStartHour = parseInt(periodStartTime[0]);
    let periodStartMinute = parseInt(periodStartTime[1]);
    let periodStartTimeInMinutes = periodStartHour * 60 + periodStartMinute;
    if (currentTimeInMinutes >= periodStartTimeInMinutes) {
      currentPeriodIndex = i;
    }
  }
  return currentPeriodIndex;
}

export function subtractTime(time) {
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

export function removeSeconds(time) {
  let timeWithoutSeconds = time.split(":").slice(0, 2).join(":");
  return timeWithoutSeconds;
}

export function currentPeriodHelper(dateTimeIso) {
  const date = new Date(dateTimeIso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const a = subtractTime(`${hours}:${minutes}:${seconds}`);
  return removeSeconds(a);
}

export function getCurrentWeekday() {
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

export function convertTo12Hour(time) {
  let [hours, minutes, seconds] = time.split(":").map((val) => parseInt(val));
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function convertDateTimeIsoToTime(dateTimeIso) {
  const date = new Date(dateTimeIso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const a = subtractTime(`${hours}:${minutes}:${seconds}`);
  return convertTo12Hour(a);
}
