// Setup empty JS object to act as endpoint for all routes
const fetch = require("node-fetch");
require("dotenv").config();

const geoNamesAPI = "http://api.geonames.org/searchJSON?username={user}&q=";

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
app.use(cors());

// Initialize the main project folder
// app.use(express.static("website"));
// Setup Server

const port = 3000;
app.listen(port, () => console.log(`server listenning on ${port}`));

app.get("/get", (req, res) => res.send("ok"));

app.post("/post", async (req, res) => {
  const data = req.body;
  const url = geoNamesAPI.replace("{user}", process.env.GeoUser);
  console.log(url);
  const geoResponse = await fetch(url + data.city);
  const responseData = await geoResponse.json();
  res.send(responseData);
});
