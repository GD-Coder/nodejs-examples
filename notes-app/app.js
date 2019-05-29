const chalk = require("chalk")
const yargs = require("yargs")
const noteService = require("./notes")

const log = console.log

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note contents",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) =>
        log(
            chalk.yellow.bold("Title: ") +
            chalk.blue(argv.title) + ", " +
            chalk.yellow.bold("Body: ") +
            chalk.blue(argv.body)
        )
})

yargs.command({
    command: "remove",
    describe: "Remove a new note",
    builder: {
        title: {
            describe: "Note title to remove",
            demandOption: true,
            type: 'string'
        }
    },
    handler: () => log("removing note")
})

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: () => log("listing all added notes")
})

yargs.command({
    command: "read",
    describe: "Read an added note",
    builder: {
        title: {
            describe: "Note title to read",
            demandOption: true,
            type: 'string'
        }
    },
    handler: () => log("reading a note")
})

yargs.parse()