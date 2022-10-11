const knex = require("../../config/db")

class Message {
    _text
    _user_id
    _contact_id

    async findUser() {
        try {            
            const data = await knex.select().from("messages").where({ user_id: this._user_id })

            
            return {  data: data[0], error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }

    async save() {
        try {
            await knex.insert({ text: this._text, user_id: this._user_id, contact_id: this._contact_id }).into("messages")

            return { error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }
}

module.exports = new Message