const bcrypt = require('bcrypt')
const { requireHelper } = require('../util/helper')
const jwt = require("jsonwebtoken");
const User = requireHelper('database/models/user')
const config = requireHelper('config/config')
const { v4: uuidv4, validate } = require('uuid');
const { encryptData } = requireHelper('util/encrypt');

async function createUser (userData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const user = new User({
            name: userData.name,
            userId: uuidv4(),
            email: userData.email,
            password: hashedPassword
        })

        await user.save()

        return user.userId
    } catch (error) {
        throw new Error(error.errorResponse.code ? error.errorResponse.code : error)
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

        await validatePassword(userData.password, user.password)

        if(user.recoveryToken){
            user.recoveryToken = undefined
            await user.save()
        }

        const token = jwt.sign({userId: user.userId}, config.secretJwtKey, { expiresIn: '7d' });

        return encryptData(token)
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getUser (userId) {
    try {
        const user = await User.findOne({
            userId: userId
        }).select('-_id -__v -password')

        if (!user) {
            throw new Error('User not found')
        }

        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

async function updateUser (userId, newData) {
    try {

        delete newData.password
        delete newData.userId

        const user = await User.findOneAndUpdate(
            {
                userId: userId
            },
            newData
        )

        if (!user) {
            throw new Error('User not found')
        }

        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

async function updatePassword (userId, currentPassword, newPassword) {
    try {
        const user = await User.findOne({
            userId: userId
        })

        await validatePassword(currentPassword, user.password)

        if (!user) {
            throw new Error('User not found')
        }

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()

        return true
    } catch (error) {
        throw new Error(error.message)
    }
}

async function deleteUser (userId, password) {
    try {
        const user = await User.findOne({
            userId: userId
        })
        
        if (!user) {
            throw new Error('User not found')
        }

        await validatePassword(password, user.password)
        await User.deleteOne({
            userId: userId
        })

        return true
    } catch (error) {
        throw new Error(error.message)
    }
}

async function recoverPassword (email, userId) {
    try {
        const user = await User.findOne({
            email: email,
            userId: userId
        })

        if (!user) {
            throw new Error('User not found')
        }

        const token = jwt.sign({}, config.secretJwtKey, { expiresIn: '1h' });

        user.recoveryToken = token
        await user.save()

        return token
    } catch (error) {
        throw new Error(error.message)
    }
}

async function resetPassword (token, password) {
    try {
        jwt.verify(token, config.secretJwtKey);
        const user = await User.findOne({
            recoveryToken: token,
        })

        if (!user || !token) {
            throw new Error('Invalid token, issue a new one')
        }

        user.recoveryToken = undefined
        user.password = await bcrypt.hash(password, 10)
        await user.save()

        return true
    } catch (error) {
        throw new Error(error.message)
    }
}

async function validatePassword(password, hashedPassword) {
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
    if (!isPasswordCorrect) {
        throw new Error('Invalid password')
    }
}

module.exports = {
    createUser,
    getToken,
    getUser,
    updateUser,
    updatePassword,
    deleteUser,
    recoverPassword,
    resetPassword
}