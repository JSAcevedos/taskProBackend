const bcrypt = require('bcrypt')
const { requireHelper } = require('../util/helper')
const User = requireHelper('database/models/user')

async function createUser (userData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const user = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        })

        await user.save()

        return true
    } catch (error) {
        throw new Error(error.errorResponse.code)
    }
}

module.exports = {
    createUser
}