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
    handler: (argv) => log(
        noteService.addNote(argv.title, argv.body) ?
        chalk.green("Note added successfully!") : chalk.red("Note already exists...")
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
    handler: (argv) => log(
        noteService.removeNote(argv.title) ?
        chalk.green("Note removed successfully!") : chalk.red("Note doesn't exist...")
    )
})

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: () => log(noteService.listNotes())
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
    handler: (argv) => log(noteService.readNote(argv.title))
})

yargs.parse()