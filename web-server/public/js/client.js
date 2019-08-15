console.log("client side javascript file is loaded.")

const weatherForm = document.querySelector("form")
const search = document.querySelector(".search")
const city = document.querySelector("#city")
const forecast = document.querySelector("#forecast")
const error = document.querySelector("#error")
const loader = document.querySelector("#loader")
const hamburger = document.getElementById("hamburger")
const menu = $(".nav.navbar-nav")[0]
var menuIsOpen = false
var style = menu.style

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
  fetch(`/weather?address=${search.value}`).then(response => {
    response.json().then(data => {
      clearInterval(loading)
      loader.textContent = ""
      if (data.error) {
        error.textContent = data.error
        search.value = ""
      } else {
        search.value = ""
        city.textContent = data.location
        forecast.textContent = data.forecast
      }
    })
  })
})

function toggleMenu() {
  function show(menu) {
    hamburger.classList.add("hamburger-active")
    style.height = "auto"
  }

  function hide(menu) {
    hamburger.classList.remove("hamburger-active")
    style.height = 0
  }

  if (menuIsOpen) {
    hide(menu)
  } else {
    show(menu)
  }
  menuIsOpen = !menuIsOpen
}

var path = document.querySelector(".rays")
var l = path.getTotalLength()
console.log(l)
