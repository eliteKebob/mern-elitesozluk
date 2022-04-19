const express = require("express")
const router = express.Router()

const {
    registerUser,
    loginUser,
    getUser,
  } = require("../controllers/userControllers.js")
  
  router.post("/", registerUser)
  router.post("/login", loginUser)
  router.get("/:id", getUser)

  module.exports = router