const chalk = require("chalk")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const log = console.log

const displayColoredResult = (color, message, option) =>
  option ? log(chalk[option][color](message)) : log(chalk[color](message))

geocode(process.argv[2], (error, geoData) => {
  if (process.argv[2] == null) {
    return displayColoredResult(
      "red",
      "Please provide a city to see weather information..."
    )
  }
  error
    ? displayColoredResult("red", error)
    : forecast(geoData.latitude, geoData.longitude, (error, weatherData) => {
        error
          ? displayColoredResult("red", error)
          : displayColoredResult(
              "green",
              `It is ${
                weatherData.currentTemp
              } degrees out right now. There is a ${
                weatherData.rainProb
              }% chance of rain. ${weatherData.summary} Forcast for: ${
                geoData.location
              }`
            )
      })
})
