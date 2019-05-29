const fs = require("fs")

const noteService = {

    result: false,
    index: null,
    notesBuffer: null,
    notesJSON: null,
    note: {},
    notes: [],

    loadNotes() {
        try {
            this.notesBuffer = fs.readFileSync("notes.json")
            this.notesJSON = this.notesBuffer.toString()
            return JSON.parse(this.notesJSON)
        } catch (e) {
            return []
        }
    },

    listNotes() {
        this.notes = this.loadNotes()
        return this.notes
    },

    addNote(title, body) {
        if (this.readNote(title) == null) {
            this.notes = this.loadNotes()
            this.note.title = title
            this.note.body = body
            this.notes.push(this.note)
            this.saveNotes()
            return true
        } else {
            return false
        }
    },

    findNote(title) {
        return this.notes.find(note => note.title === title)
    },

    saveNotes() {
        fs.writeFileSync("notes.json", JSON.stringify(this.notes))
    },

    readNote(title) {
        this.notes = this.loadNotes()
        return this.findNote(title)
    },

    removeNote(title) {
        this.notes = this.loadNotes()
        this.index = this.notes.indexOf(this.findNote(title))
        if (this.index !== -1) {
            this.result = this.notes.splice(this.index, 1)
            this.saveNotes()
        }
        return this.result
    }
}

module.exports = noteService