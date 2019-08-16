const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static serve directory
app.use(express.static(publicPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    creator: "Gerald Downey"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About This App",
    creator: "Gerald Downey"
  })
})

// app.get("/help", (req, res) => {
//   res.render("help", {
//     title: "Help page",
//     creator: "Gerald Downey"
//   })
// })

app.get("/weather", ({ query }, res) => {
  const address = query.address
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (!address) {
      return res.send({ error: "You must provide an address." })
    }
    error != undefined
      ? res.send({ error })
      : forecast(
          latitude,
          longitude,
          (error, { currentTemp, rainProb, summary }) => {
            error
              ? res.send({ error })
              : res.send({
                  forecast: `It is ${currentTemp} degrees out right now. There is a ${rainProb}% chance of rain. ${summary}`,
                  location: location
                })
          }
        )
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found",
    creator: "Gerald Downey"
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
    creator: "Gerald Downey"
  })
})

app.listen(port, () => {
  console.log(`Server is started on port ${port}...`)
})
