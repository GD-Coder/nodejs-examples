const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/c7ce5c066275d2ab3566eb37ea9fe713/${latitude},${longitude}`

  request({ url, json: true }, (error, { body }) => {
    if (error || body.error) {
      error
        ? callback("Unable to connect to service.", undefined)
        : callback("Unable to find given location", undefined)
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
