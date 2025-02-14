const { requireHelper } = require('../util/helper')
const userServices = requireHelper('services/user')

async function createUser (req, res) {
    try {
        
        const userId = await userServices.createUser(req.body)
        res.status(201).send({userId: userId})

    } catch (error) {   
        if (error.message == 11000) {
            return res.status(400).send('Email already exists')
        }
        return res.status(500).send(error.message)
    }
}

async function login (req, res) {
    try {
        
        const token = await userServices.getToken(req.body)
        res.setHeader('Authorization',`Bearer ${token}`)
        res.status(200).send({message: "success"})

    } catch (error) { 
        return res.status(500).send(error.message)
    }
}

async function getUser (req, res) {
    try {
        
        const user = await userServices.getUser(req.userId)
        res.status(200).send({data: user})

    } catch (error) { 
        return res.status(500).send(error.message)
    }
}

async function updateUser (req, res) {
    try {
        
        await userServices.updateUser(req.userId, req.body)
        res.status(200).send({message: "User updated successfully"})

    } catch (error) { 
        return res.status(500).send(error.message)
    }
}

async function updatePassword (req, res) {
    try {
        
        await userServices.updatePassword(req.userId, req.body.password, req.body.newPassword)
        res.status(200).send({message: "Password updated successfully"})

    } catch (error) { 
        return res.status(500).send(error.message)
    }
}

async function deleteUser (req, res) {
    try {
        
        await userServices.deleteUser(req.userId, req.body.password)
        res.status(200).send({message: "User deleted successfully"})

    } catch (error) { 
        return res.status(500).send(error.message)
    }
}

async function recoverPassword (req, res) {
    try {
        
        const token = await userServices.recoverPassword(req.body.email, req.body.userId)
        res.status(200).send({token: token})

    } catch (error) { 
        return res.status(500).send(error.message)
    }
}

async function resetPassword (req, res) {
    try {
        
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            return res.status(400).send('Invalid token')
        }
        await userServices.resetPassword(token, req.body.password)

        res.status(200).send({message: "Password reset successfully"})

    } catch (error) { 
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createUser,
    login,
    getUser,
    updateUser,
    deleteUser,
    updatePassword,
    recoverPassword,
    resetPassword
}