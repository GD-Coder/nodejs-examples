const mongoose = require("mongoose")
const validator = require("validator")
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api"

mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true })

const User = mongoose.model("User", {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowecase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!")
      }
    }
  }
})

const Task = mongoose.model("Task", {
  description: { type: String, required: true },
  complete: { type: Boolean, required: true }
})

const user = new User({
  name: "Test User               ",
  email: "dipsy@doodle.com             "
})

const task = new Task({
  description: "Learn NodeJS",
  complete: false
})

user
  .save()
  .then(result => {
    console.log(user)
  })
  .catch(error => {
    console.log(error)
  })

// task
//   .save()
//   .then(result => {
//     console.log(task)
//   })
//   .catch(error => {
//     console.log(error)
//   })
