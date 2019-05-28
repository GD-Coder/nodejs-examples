const add = require('./utils')
const getNotes = require('./notes')
const validator = require('validator')
const chalk = require('chalk')
const sum = add(6, 9)
const log = (data) => console.log(data)


log(getNotes(1))

log(validator.isEmail('jimmy@jammy.com'))

log(chalk.yellow.bold.inverse('Success!'))

log(chalk.red.bold('Success!'))

log(chalk.green('Success!'))

log(chalk.blue(sum))