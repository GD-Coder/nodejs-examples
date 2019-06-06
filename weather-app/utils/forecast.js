const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/c7ce5c066275d2ab3566eb37ea9fe713/${latitude},${longitude}`

  request({ url: url, json: true }, (error, response) => {
    if (error || response.body.error) {
      error
        ? callback("Unable to connect to service.", undefined)
        : callback("Unable to find given location", undefined)
    } else {
      callback(undefined, {
        currentTemp: response.body.currently.temperature,
        rainProb: response.body.currently.precipProbability,
        summary: response.body.daily.summary
      })
    }
  })
}

module.exports = forecast
