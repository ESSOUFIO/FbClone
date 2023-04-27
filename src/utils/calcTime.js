export const calcTime = (postTime) => {
  const d = new Date();
  let timeDiff = d.getTime() - postTime;
  // Calculate milliseconds in a year
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const year = day * 365;

  let years, weeks, days, hours, minutes;
  years = Math.round(timeDiff / year);

  if (years) {
    return `${years}y`;
  }
  weeks = Math.round(timeDiff / week);
  if (weeks) {
    return `${weeks}w`;
  }
  days = Math.round(timeDiff / day);
  if (days) {
    return `${days}d`;
  }
  hours = Math.round(timeDiff / hour);
  if (hours) {
    return `${hours}h`;
  }
  minutes = Math.round(timeDiff / minute);
  return minutes === 0 ? "now" : `${minutes}min`;
};
