const chalk = require("chalk")
const yargs = require("yargs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const errorService = require("./error")
const log = console.log

const displayColoredResult = (color, message, option) =>
  option ? log(chalk[option][color](message)) : log(chalk[color](message))

geocode("Oklahoma City", (error, data) => {
  log(error)
  log(data)
})

forecast(-97.5164, 35.4676, (error, data) => {
  log(error)
  log(data)
})
