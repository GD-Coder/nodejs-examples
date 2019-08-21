require("../src/db/mongoose")
const User = require("../src/db/models/user")

// 5d5c061400c73abfb0e5bac4

User.findByIdAndUpdate("5d5c0c47158276d4b054c985", { age: 40 })
  .then(user => {
    console.log(user)
    return User.countDocuments({ age: 30 })
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
