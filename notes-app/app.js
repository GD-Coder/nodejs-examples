const add = require('./utils')
const getNotes = require('./notes')
const validator = require('validator')
const sum = add(6, 9)


console.log(getNotes(1))

console.log(validator.isEmail('jimmy@jammy.com'))