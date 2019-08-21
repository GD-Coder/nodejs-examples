const express = require("express")
const router = new express.Router()
const User = require("../db/models/user")
const auth = require("../middleware/auth")
const multer = require("multer")


const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Avatar must be an image (.jpg | .jpeg | .png)."))
    }
    callback(undefined, true)
  }
})

router.post("/user", async (req, res) => {
  try {
    const user = await new User(req.body).save()
    const token = await user.generateAuthToken()
    res.status(201).send({
      user,
      token
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({
      user,
      token
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.patch("/user/update", auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["name", "email", "password", "age", ]
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates..."
    })
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]))
    await req.user.save()
    res.status(200).send(req.user)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

router.get("/user/me", auth, async (req, res) => {
  const user = await req.user.populate("tasks").execPopulate()
  res.status(200).send({
    user,
    tasks: req.user.tasks
  })
})

router.post("/user/me/avatar",
  auth, upload.single("avatar"), async (req, res) => {
      req.user.avatar = req.file.buffer
      await req.user.save()
      res.send()
    },
    (error, req, res, next) => {
      res.status(400).send({
        error: error.message
      })
    }
)

router.delete("/user/remove", auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete("/user/remove/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router