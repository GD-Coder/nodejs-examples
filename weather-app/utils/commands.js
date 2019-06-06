const yargs = require("yargs")

yargs.command({
  command: "show",
  describe: "Show weather for a given location",
  builder: {
    city: {
      describe: "City for weather report",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => (geocodeService.city = argv.city)
})

yargs.parse()
