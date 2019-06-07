const request = require("request")

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
    ${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoiZ2VyYWxkZDB3bmV5IiwiYSI6ImNqd2Fxa3ZpZTAyMjg0OW5yMWhwZDF1dHoifQ.EwpJ8GB1EPwqbN2kYGvmLg&limit=1`

  request({ url: url, json: true }, (error, { body }) => {
    if (error || body.features.length === 0) {
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
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
