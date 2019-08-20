const mongoose = require("mongoose")
const validator = require("validator")

const Task = mongoose.model("Task", {
  title: { type: String, required: true, trim: true, maxlength: 20 },
  description: { type: String, required: true, trim: true, maxlength: 255 },
  complete: { type: Boolean, default: false }
})

module.exports = Task
