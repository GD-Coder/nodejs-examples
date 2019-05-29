const chalk = require("chalk")
const yargs = require("yargs")
const noteService = require("./notes")

const log = console.log

yargs.command({
    command: "add",
    describe: "Add a new note",
    handler: () => log("added new note")
})

yargs.command({
    command: "remove",
    describe: "Remove a new note",
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
    handler: () => log("reading a note")
})