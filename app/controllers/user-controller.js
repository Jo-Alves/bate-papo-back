const user_model = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = {
    save: async (req, res) => {
        const { name, email, id, password } = req.body

        user_model._id = id
        user_model._name = name
        user_model._email = email
        user_model._password = await bcrypt.hash(password, 10)

        const responseDBReferencesTableUser = await user_model.save()
        if (responseDBReferencesTableUser.error) {
            return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
        }

        const status = id ? 204 : 201
        res.status(status).json({})

    },
    findAll: async (req, res) => {
        const users = await user_model.findAll();
        if (users.error) {
            return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
        }

        res.json(users.data)
    },
    login: async (req, res) => {
        const error = { email: "", password: "" }
        const { email, password } = req.body
        user_model._email = email
        user_model._password = password

        const users = await user_model.findByEmail()

        if (users.error) {
            return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
        }
        else if (!users.emailExits) {
            error.email = "Email não encontrado"
            return res.status(406).json({ error })
        }

        const isPassword = await bcrypt.compare(password, users.data.password)
        if (!isPassword) {
            error.password = "A senha está incorreta."
            return res.status(406).json({ error })
        }

        payload = {
            id: users.data.id,
            name: users.data.name,
            email: users.data.email
        }

        const jsonwebtoken = jwt.sign(payload, process.env.SECRET)

        res.status(200).json({ tk: jsonwebtoken })
    }
}

module.exports = User