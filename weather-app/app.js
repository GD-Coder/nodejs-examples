const chalk = require("chalk")
const request = require("request")
const log = console.log

const displayColoredResult = (color, message, option) =>
  option ? log(chalk[option][color](message)) : log(chalk[color](message))

const url =
  "https://api.darksky.net/forecast/c7ce5c066275d2ab3566eb37ea9fe713/35.4676,-97.5164"

request({ url: url, json: true }, (error, response) => {
  displayColoredResult(
    "green",
    "It is currently " +
      response.body.currently.temperature +
      " degrees out. There is a " +
      response.body.currently.precipProbability +
      "% chance of rain."
  )
})
