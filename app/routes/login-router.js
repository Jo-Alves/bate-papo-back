const router = require("express").Router()

const User = require("../controllers/user-controller")

router.post("/login", User.login)

module.exports = router