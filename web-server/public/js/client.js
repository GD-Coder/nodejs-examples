console.log("client side javascript file is loaded.")

const weatherForm = document.querySelector("form")
const search = document.querySelector(".search")
const city = document.querySelector("#city")
const forecast = document.querySelector("#forecast")
const error = document.querySelector("#error")
const loader = document.querySelector("#loader")

const appendEllipsis = () => (loader.textContent = loader.textContent + ".")

const clear = () => {
  error.textContent = ""
  city.textContent = ""
  forecast.textContent = ""
}

weatherForm.addEventListener("submit", event => {
  clear()
  event.preventDefault()
  const loading = setInterval(appendEllipsis, 1000)
  loader.textContent = "Fetching forecast, please wait."
  fetch(`http://localhost:3000/weather?address=${search.value}`).then(
    response => {
      response.json().then(data => {
        clearInterval(loading)
        loader.textContent = ""
        if (data.error) {
          error.textContent = data.error
        } else {
          city.textContent = data.location
          forecast.textContent = data.forecast
        }
      })
    }
  )
})
