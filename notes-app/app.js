const chalk = require("chalk")
const yargs = require("yargs")
const noteService = require("./notes")

const log = console.log

const displayColoredResult = (color, message, option) => option ? log(chalk[option][color](message)) : log(chalk[color](message))

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
        noteService.addNote(argv.title, argv.body) ?
        displayColoredResult("green", "Note added successfully!") : displayColoredResult("red", "Note already exists...")
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
    handler: (argv) =>
        noteService.removeNote(argv.title) ?
        displayColoredResult("green", "Note removed successfully!") : displayColoredResult("red", "Note doesn't exist...")
})

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: () => {
        let notes = noteService.listNotes()
        notes != null ?
            notes.forEach(note => {
                displayColoredResult("green", "Title: " + note.title, "inverse")
                displayColoredResult("green", "Body: " + note.body)
            }) : displayColoredResult("red", "No notes exist yet...")
    }
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
    handler: (argv) => {
        let note = noteService.readNote(argv.title)
        if (note != null) {
            displayColoredResult("green", "Title: " + note.title, "inverse")
            displayColoredResult("green", "Body: " + note.body)
        } else {
            displayColoredResult("red", "Note doesn't exist...")
        }
    }
})

yargs.parse()