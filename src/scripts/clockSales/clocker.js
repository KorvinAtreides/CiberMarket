import getTimeRemaining from "./timeRest.js";

export default function initializeClock(elem, endtime) {
  let timeinterval = setInterval(function () {
    let = getTimeRemaining(endtime);
    if (t.total > 0) {
      elem.children[
        elem.children.length - 1
      ].innerHTML = `${t.days} days ${t.hours} hours ${t.minutes} minutes ${t.seconds} seconds`;
    } else {
      elem.innerHTML = "Time is over!!!";
    }
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }, 1000);
}
