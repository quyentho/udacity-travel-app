// Setup empty JS object to act as endpoint for all routes
require("dotenv").config();

const geoNamesAPI = "http://api.geonames.org/searchJSON?username={user}&q=";
const weatherbitForecastAPI = " http://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbitCurrentAPI = "http://api.weatherbit.io/v2.0/current?";
const pixabayURL = "https://pixabay.com/api/?";

// Require Express to run server and routes
const express = require("express");
const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors for cross origin allowance
const cors = require("cors");
const { getDaysLeftFromNow } = require("./getDaysLeftFromNow");
const { fetchAsync } = require("./fetchAsync");
app.use(cors());

// Initialize the main project folder
// app.use(express.static("website"));
// Setup Server

const port = 3000;
app.listen(port, () => console.log(`server listenning on ${port}`));

app.get("/get", (req, res) => res.send("ok"));

app.post("/post", async (req, res) => {
  const data = req.body;

  // get latitute, longtitute from geoNames API
  const geoNamesUrl = geoNamesAPI.replace("{user}", process.env.GeoUser);
  const geoData = await fetchAsync(geoNamesUrl + data.city);
  const latitute = geoData.geonames[0].lat;
  const longtitute = geoData.geonames[0].lng;

  // get weather forecast from weather bit API.
  const daysLeft = getDaysLeftFromNow(data.departingDate);
  const weatherBitUrl =
    daysLeft <= 7 ? weatherbitCurrentAPI : weatherbitForecastAPI;

  const weatherBitData = await fetchAsync(
    weatherBitUrl +
      "lat=" +
      latitute +
      "&lon=" +
      longtitute +
      "&key=" +
      process.env.WeatherBitAPIKey
  );

  const weatherDataProjected = weatherBitData.data.map((d) => ({
    date: d.datetime,
    weather: d.weather.description,
    temp: d.temp,
    max_temp: d.max_temp,
    min_temp: d.min_temp,
  }));

  // get images from Pixa bay API
  const image = await fetchAsync(
    pixabayURL +
      "key=" +
      process.env.PixaBayAPIKey +
      "&q=" +
      data.city +
      "&image_type=photo"
  );

  const imageUrl = image.hits[0].webformatURL;
  res.send({
    weatherData: weatherDataProjected,
    image: imageUrl,
    daysLeft,
  });
});
