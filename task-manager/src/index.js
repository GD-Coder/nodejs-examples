const express = require("express")
require("./db/mongoose")

const User = require("./db/models/user")
const Task = require("./db/models/task")

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>")
})

app.get("/users", (req, res) => {
  User.find({})
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      res.status(500).send(error.message)
    })
})

app.get("/user/:id", (req, res) => {
  const _id = req.params.id
  User.findById(_id)
    .then(user => {
      user ? res.send(user) : res.status(404).send()
    })
    .catch(error => {
      res.status(500).send(error.message)
    })
})

app.post("/users", (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then(response => {
      res.status(201).send(response)
    })
    .catch(error => {
      res.status(400).send(error.message)
    })
})

app.get("/tasks", (req, res) => {
  Task.find({})
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      res.status(500).send(error.message)
    })
})

app.get("/task/:id", (req, res) => {
  const _id = req.params.id
  Task.findById(_id)
    .then(task => {
      task ? res.send(task) : res.status(404).send()
    })
    .catch(error => {
      res.status(500).send(error.message)
    })
})

app.post("/tasks", (req, res) => {
  const task = new Task(req.body)
  task
    .save()
    .then(response => {
      res.status(201).send(response)
    })
    .catch(error => {
      res.status(400).send(error.message)
    })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`)
})
