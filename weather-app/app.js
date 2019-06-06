const chalk = require("chalk")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const log = console.log

const displayColoredResult = (color, message, option) =>
  option ? log(chalk[option][color](message)) : log(chalk[color](message))

geocode("Oklahoma City", (error, data) => {
  error
    ? displayColoredResult("red", error)
    : forecast(data.latitude, data.longitude, (error, data) => {
        error
          ? displayColoredResult("red", error)
          : displayColoredResult(
              "green",
              `It is ${data.currentTemp} degrees out right now. There is a ${
                data.rainProb
              }% chance of rain. ${data.summary}`
            )
      })
})
