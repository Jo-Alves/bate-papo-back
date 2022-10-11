const message_model = require("../models/messages-model")

const Message = {
	save: async (req, res) => {
			const { text, contact_id, user_id, } = req.body

			message_model._text = text
			message_model._contact_id = contact_id
			message_model._user_id = user_id

			const responseDBReferencesTableMessage = await message_model.save()
			if (responseDBReferencesTableMessage.error) {
					return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
			}

			res.status(201).json({})

	},
	findAll: async (req, res) => {
			message_model._user_id = req.body.user_id
			const users = await message_model.findUser();
			if (users.error) {
					return res.status(500).send({ error: "Ops... Houve um erro no servidor. Tente novamente mais tarde" })
			}

			res.json(users.data)
	}
}

module.exports = Message