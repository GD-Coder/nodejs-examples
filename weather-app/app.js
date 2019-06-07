const chalk = require("chalk")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const log = console.log

const displayColoredResult = (color, message, option) =>
  option ? log(chalk[option][color](message)) : log(chalk[color](message))

geocode(process.argv[2], (error, { latitude, longitude, location }) => {
  if (!process.argv[2]) {
    return displayColoredResult(
      "red",
      "Please provide a city to see weather information..."
    )
  }
  error
    ? displayColoredResult("red", error)
    : forecast(
        latitude,
        longitude,
        (error, { currentTemp, rainProb, summary }) => {
          error
            ? displayColoredResult("red", error)
            : displayColoredResult(
                "green",
                `It is ${currentTemp} degrees out right now. There is a ${rainProb}% chance of rain. ${summary} Forcast for: ${location}`
              )
        }
      )
})
