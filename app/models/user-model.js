const knex = require("../../config/db")

class User {
    _id
    _name
    _email
    _password

    async findAll() {
        try {
            const data = await knex.select(["id", "name", "email"]).from("users")

            return { data, error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }

    async findByEmail() {
        try {
            let emailExits = false
            const data = await knex.select().from("users").where({ email: this._email })

            if (data.length > 0)
                emailExits = true

            return { emailExits, data: data[0], error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }

    async save() {
        try {
            if (!this._id)
                await knex.insert({ name: this._name, email: this._email, password: this._password }).into("users")
            else
                await knex.update({ name: this._name, email: this._email, password: this._password }).table("users").from({ id: this._id })

            return { error: false }
        } catch (error) {
            console.error(error)
            return { error: true }
        }
    }
}

module.exports = new User