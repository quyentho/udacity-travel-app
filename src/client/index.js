import "./styles/style.scss";
import dateToYearMonthDateFormat from "./js/dateToYearMonthDateFormat";
import get16DaysFromNow from "./js/get16DaysFromNow";

// declare elements
const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const departingInput = document.getElementById("departing");

// set the min is current date and max is 16 days from now for the timepicker
// because weatherbit API only forecast in 16 days from now.
const now = new Date();
departingInput.valueAsDate = now;
departingInput.min = dateToYearMonthDateFormat(now);
departingInput.max = dateToYearMonthDateFormat(get16DaysFromNow(now));

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   handleSubmit(formText);
// });
