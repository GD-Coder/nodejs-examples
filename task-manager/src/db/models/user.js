const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model("User", {
  name: { type: String, required: true, trim: true },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(
          'Password is invalid... Please provide password that does not contain the word "password".'
        )
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowecase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(
          "Email is invalid... please provide a valid email address (e.g. user@company.com)"
        )
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number...")
      }
    }
  }
})

module.exports = User
