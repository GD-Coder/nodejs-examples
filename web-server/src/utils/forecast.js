const request = require("request")
const config = require("../utils/config/config")

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${config.darkSkyKey}/${latitude},${longitude}`

  request({ url, json: true }, (error, { body }) => {
    if (error || body.error) {
      error
        ? callback(
            "Unable to connect to service! Check your internet connection and try again.",
            undefined
          )
        : callback(
            "Unable to find given location! Please try another location.",
            undefined
          )
    } else {
      callback(undefined, {
        currentTemp: body.currently.temperature,
        rainProb: body.currently.precipProbability,
        summary: body.daily.summary
      })
    }
  })
}

module.exports = forecast
