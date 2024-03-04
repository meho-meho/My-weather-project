import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

// api response test sample
// let api = {
//   coord: { lon: 13.1872, lat: 32.8877 },
//   weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
//   base: "stations",
//   main: {
//     temp: 289.58,
//     feels_like: 288.69,
//     temp_min: 289.58,
//     temp_max: 289.58,
//     pressure: 1030,
//     humidity: 54,
//     sea_level: 1030,
//     grnd_level: 1028,
//   },
//   visibility: 10000,
//   wind: { speed: 3.44, deg: 301, gust: 4.71 },
//   clouds: { all: 0 },
//   dt: 1707151825,
//   sys: { country: "LY", sunrise: 1707112803, sunset: 1707151340 },
//   timezone: 7200,
//   id: 2210245,
//   name: "Tripoli",
//   cod: 200,
// };

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("get route");
  res.render("index.ejs");
});

app.post("/data", async (req, res) => {
  const { lat, lon } = req.body;
  console.log(lat + "" + lon);
  const date = new Date();
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    console.log("used the api");
    const api = response.data;
    const mydata = {
      description: api.weather[0].description,
      icon: api.weather[0].icon,
      temp: Math.round(api.main.temp - 273.15),
      name: api.name,
      date: date.getFullYear()
    };
    console.log("post route");
    res.render("weather.ejs", {mydata});
  } catch (error) {
    res.status(500).json({
      massege:
        "error fetching data, we have reached the API call limit, try again later",
    });
  }
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
