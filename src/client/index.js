import "./styles/style.scss";
import dateToYearMonthDateFormat from "./js/dateToYearMonthDateFormat";
import get16DaysFromNow from "./js/get16DaysFromNow";

// declare elements
const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const departingInput = document.getElementById("departing");
const planSectionDisplay = document.getElementById("plan");
const cityDisplay = document.getElementsByClassName("city-display")[0];
const dateDisplay = document.getElementsByClassName(
  "departing-date-display"
)[0];
const dateLeftDisplay = document.getElementsByClassName("day-left")[0];
const weatherList = document.getElementsByClassName("weather-list")[0];

// set the min is current date and max is 16 days from now for the timepicker
// because weatherbit API only forecast in 16 days from now.
const now = new Date();
departingInput.valueAsDate = now;
departingInput.min = dateToYearMonthDateFormat(now);
departingInput.max = dateToYearMonthDateFormat(get16DaysFromNow(now));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const departingDate = new Date(departingInput.valueAsDate);
  const city = cityInput.value;
  const body = {
    departingDate,
    city,
  };
  const response = await fetch("http://localhost:3000/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  planSectionDisplay.style.display = "block";
  cityDisplay.textContent = city;
  dateDisplay.textContent = departingDate.toLocaleDateString();
  dateLeftDisplay.textContent = data.daysLeft;

  data.weatherData.forEach((d) => {
    const li = document.createElement("li");
    const weatherContent = `${d.date} will be ${d.weather} with avarage temperature: ${d.temp}`;
    li.textContent = weatherContent;
    weatherList.appendChild(li);
  });
});
