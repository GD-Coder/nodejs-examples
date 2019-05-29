const add = require('./utils')
const noteService = require('./notes')
const validator = require('validator')
const chalk = require('chalk')
const sum = add(6, 9)
const log = (data) => console.log(data)
const command = process.argv[2]
const note = process.argv[3]


command === add && note ?
    noteService.addNote(note) : log('No note added...')


log(getNotes(1))

log(validator.isEmail('jimmy@jammy.com'))

log(chalk.yellow.bold.inverse('Success!'))

log(chalk.red.bold('Success!'))

log(chalk.green('Success!'))

log(chalk.blue(sum))

console.log('utils.js is calling...')

const words = 'This is a lot like VueJS!'

const add = (a, b) => a + b

module.exports = add