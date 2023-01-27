function findCurrentPeriod(periods) {
  var currentPeriodIndex = -1;
  var currentDate = new Date();
  var currentHour = currentDate.getHours();
  var currentMinute = currentDate.getMinutes();
  var currentTimeInMinutes = currentHour * 60 + currentMinute;
  for (var i = 0; i < periods.length; i++) {
    var periodStartTime = periods[i].split(":");
    var periodStartHour = parseInt(periodStartTime[0]);
    var periodStartMinute = parseInt(periodStartTime[1]);
    var periodStartTimeInMinutes = periodStartHour * 60 + periodStartMinute;
    if (currentTimeInMinutes >= periodStartTimeInMinutes) {
      currentPeriodIndex = i;
    }
  }
  return currentPeriodIndex;
}
export default findCurrentPeriod;
