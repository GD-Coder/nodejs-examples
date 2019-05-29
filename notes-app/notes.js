const fs = require("fs")

const noteService = {

    getNotes() {
        fs.readFileSync("notes.txt")
    },

    addNote(note) {
        fs.writeFileSync("notes.txt", JSON.stringify(note))
    }
}

module.exports = noteService