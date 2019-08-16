const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    const db = error
      ? console.log("Unable to connect to database!")
      : client.db(databaseName)

    // db.collection("users").insertOne(
    //   {
    //     name: "Nikki",
    //     age: 30
    //   },
    //   (error, result) => {
    //     if (error) {
    //       console.log("Unable to create user!")
    //     }
    //     console.log(result.ops)
    //   }
    // )

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Learn NodeJS",
    //       complete: false
    //     },
    //     {
    //       description: "Create Weather App",
    //       complete: true
    //     },
    //     {
    //       description: "Create Task Manager",
    //       complete: false
    //     },
    //     {
    //       description: "Insert Tasks",
    //       complete: false
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       console.log("Unable to create tasks!")
    //     }
    //     console.log(result.ops)
    //   }
    // )

    // db.collection("users").find({ age: 40 }, (error, result) => {
    //   if (error) {
    //     return console.log("Cannot find user...")
    //   }
    //   console.log(result)
    // })

    db.collection("users")
      .find({ age: 40 })
      .toArray((error, users) => {
        console.log(users)
      })
  }
)
