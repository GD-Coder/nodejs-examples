const fs = require("fs")

const noteService = {

    notesBuffer: null,
    notesJSON: null,
    note: {},
    getNotes() {
        this.notesBuffer = fs.readFileSync("notes.json")
        this.notesJSON = this.notesBuffer.toString()
        return this.notesJSON
    },

    addNote(title, body) {
        this.note.title = title
        this.note.body = body
        fs.writeFileSync("notes.json", JSON.stringify(this.note))
    }
}

module.exports = noteService