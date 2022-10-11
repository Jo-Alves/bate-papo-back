const knex = require("../../config/db")

class Contact {
    _id
    _user_id

    async findByUserId() {
        try {
            const data = await knex.select(["id", "name", "email"])
                .from("contacts")
                .join("users", "users.id", "contacts.user_id")
                .where({ user_id: this._user_id })

            return { data, error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }

    async save() {
        try {

            await knex.insert({ user_id: this._user_id }).into("contacts")

            return { error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }
   
    async delete() {
        try {

            await knex.delete().into("contacts").where({ user_id: this._user_id })

            return { error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }
}

module.exports = new Contact