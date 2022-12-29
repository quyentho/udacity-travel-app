import "./styles/style.scss";
import dateToYearMonthDateFormat from "./js/dateToYearMonthDateFormat";
import get16DaysFromNow from "./js/get16DaysFromNow";

// declare elements
const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const departingInput = document.getElementById("departing");
const planSectionDisplay = document.getElementById("plan");
const cityDisplay = document.getElementsByClassName("city-display")[0];
const imageDisplay = document.getElementsByClassName("place-image")[0];
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

// Display cached data if present.
document.addEventListener("DOMContentLoaded", function () {
  const cachedData = localStorage.getItem("trip");

  if (cachedData) {
    displayData(JSON.parse(cachedData));
  }
});

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
  const dataToDisplay = {
    city,
    departingDate,
    ...data,
  };

  addDataToLocalStorage(dataToDisplay);

  displayData(dataToDisplay);
});

function addDataToLocalStorage(data) {
  if (localStorage.getItem("trip")) {
    localStorage.removeItem("trip");
  }
  localStorage.setItem("trip", JSON.stringify(data));
}

function displayData(dataToDisplay) {
  planSectionDisplay.style.display = "block";
  cityDisplay.textContent = dataToDisplay.city;
  let departingDate = dataToDisplay.departingDate;
  if (typeof departingDate === "string") {
    departingDate = new Date(dataToDisplay.departingDate);
  }
  dateDisplay.textContent = departingDate.toLocaleDateString();
  dateLeftDisplay.textContent = dataToDisplay.daysLeft;
  imageDisplay.src = dataToDisplay.image;

  weatherList.innerHTML = "";
  dataToDisplay.weatherData.forEach((d) => {
    const li = document.createElement("li");
    const weatherContent = `${d.date}: ${d.weather} with avarage temperature: ${d.temp} Celsius`;
    li.textContent = weatherContent;
    weatherList.appendChild(li);
  });
}
