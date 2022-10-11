const router = require("express").Router()
const passport = require("passport");

const auth = passport.authenticate("jwt", { session: false }); // middleware para autenticação
const Contact = require("../controllers/contact-controller")

router.post("/", Contact.save)
router.get("/", auth, Contact.findByUserId)
router.post("/login", Contact.delete)

module.exports = router