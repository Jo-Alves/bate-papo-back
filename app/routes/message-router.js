const router = require("express").Router()
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false }); // middleware para autenticação

const Message = require("../controllers/message-controller")

router.post("/", auth, Message.save)
router.get("/", auth, Message.findAll)

module.exports = router