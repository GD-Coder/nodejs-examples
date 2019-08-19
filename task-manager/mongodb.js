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

    // db.collection("users")
    //   .updateOne({ name: "Jammy" }, { $set: { name: "Sarah" } })
    //   .then(result => {
    //     console.log(result)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

    // db.collection("users")
    //   .deleteOne({ name: "Jimmy" })
    //   .then(result => {
    //     console.log(result)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }
)
