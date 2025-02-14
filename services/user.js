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

async function getToken (userData) {
    try {
        const user = await User.findOne({
            email: userData.email
        })
        if (!user) {
            throw new Error('User not found')
        }

        const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
        if (!isPasswordCorrect) {
            throw new Error('Invalid password')
        }

        const token = "test1"

        return token
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createUser,
    getToken
}