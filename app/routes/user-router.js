const router = require("express").Router()
const passport = require("passport");

const auth = passport.authenticate("jwt", { session: false }); // middleware para autenticação
const User = require("../controllers/user-controller")

router.post("/", User.save)
router.get("/", auth, User.findAll)
router.post("/login", User.login)

module.exports = router