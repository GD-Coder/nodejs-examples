const chalk = require("chalk")
const yargs = require("yargs")
const request = require("request")
const geocodeService = require("./geocode")
const errorService = require("./error")
const log = console.log

const displayColoredResult = (color, message, option) =>
	option ? log(chalk[option][color](message)) : log(chalk[color](message))

const displayError = (color, requestType, errorType) =>
	displayColoredResult(color, errorService.returnErrorResponse(requestType, errorType))

yargs.command({
	command: "show",
	describe: "Show weather for a given location",
	builder: {
		city: {
			describe: "City for weather report",
			demandOption: true,
			type: 'string'
		}
	},
	handler: (argv) => geocodeService.city = argv.city
})

yargs.parse()

request({
	url: geocodeService.returnGeocode(),
	json: true
}, (error, response) => {
	if (error || response.body.features.length === 0) {
		error ?
			displayError("red", "location", "connection") : displayError("red", "location", "location")
	} else {
		let weatherUrl = "https://api.darksky.net/forecast/c7ce5c066275d2ab3566eb37ea9fe713/" +
			response.body.features[0].center.reverse().toString()
		fetchWeatherReport(weatherUrl)
	}
})

const fetchWeatherReport = (weatherUrl) =>
	request({
		url: weatherUrl,
		json: true
	}, (error, response) => {
		if (error || response.body.error) {
			error ?
				displayError("red", "weather", "connection") : displayError("red", "weather", "location")
		} else {
			displayColoredResult("green",
				"It is " + response.body.currently.temperature +
				" degrees out right now, there is currently a " +
				response.body.currently.precipProbability +
				"% chance of rain. " + response.body.daily.summary
			)
		}
	})