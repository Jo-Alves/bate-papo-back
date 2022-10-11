const contact_model = require("../models/contact-model")

const Contact = {
    save: async (req, res) => {
        const { user_id } = req.body

        contact_model._user_id = user_id
        const responseDBReferencesTableUser = await contact_model.save()
        if (responseDBReferencesTableUser.error) {
            return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
        }

        res.status(201).json({})

    },
    findByUserId: async (req, res) => {
        contact_model._user_id = req.params.user_id
        const users = await contact_model.findByUserId();
        if (users.error) {
            return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
        }

        res.json(users.data)
    },
    delete: async (req, res) => {        
        contact_model._user_id = req.params.user_id

        const users =  await contact_model.delete()
        if (users.error) {
            return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
        }
        
        res.status(204).json({})
    }
}

module.exports = Contact