// Base
const express = require("express")
require("./db/mongoose")
const app = express()

// Routes
const UserRoutes = require("./routers/user")
const TaskRoutes = require("./routers/task")

app.use(express.json())
app.use(UserRoutes)
app.use(TaskRoutes)

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center; font-size: 65px;'>Welcome!</h1><br><p style='text-align: center; font-size: 25px;'>The server is up and running on port 3000... Create something amazing!</p>"
  )
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`)
})
