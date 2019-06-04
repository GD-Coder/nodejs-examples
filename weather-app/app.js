const chalk = require("chalk")
const request = require("request")
const geocodeService = require("./geocode")
const errorService = require("./error")
const log = console.log

const displayColoredResult = (color, message, option) =>
	option ? log(chalk[option][color](message)) : log(chalk[color](message))

var weatherUrl

request({
	url: geocodeService.returnGeocode(),
	json: true
}, (error, response) => {
	if (error) {
		displayColoredResult("red", errorService.returnErrorResponse("location", "connection"))
	} else if (!response.body.features) {
		displayColoredResult("red", errorService.returnErrorResponse("location", "location"))
	} else {
		weatherUrl = "https://api.darksky.net/forecast/c7ce5c066275d2ab3566eb37ea9fe713/" + response.body.features[0].center.reverse().toString()
	}
})

console.log(geocodeService.returnGeocode())

setTimeout(() => {
	request({
		url: weatherUrl,
		json: true
	}, (error, response) => {
		if (error) {
			displayColoredResult("red", errorService.returnErrorResponse("weather", "connection"))
		} else if (response.body.error) {
			displayColoredResult("red", errorService.returnErrorResponse("weather", "location"))
		} else {
			displayColoredResult(
				"green",
				"It is currently " +
				response.body.currently.temperature +
				" degrees out. There is a " +
				response.body.currently.precipProbability +
				"% chance of rain. " +
				response.body.daily.data[0].summary
			)
		}
	})
}, 2000)