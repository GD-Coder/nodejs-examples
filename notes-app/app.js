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
        noteService.addNote(argv.title, argv.body)
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
    handler: () => log(JSON.parse(noteService.getNotes()))
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