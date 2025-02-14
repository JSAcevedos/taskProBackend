const { requireHelper } = require('../util/helper')
const userServices = requireHelper('services/user')

async function createUser (req, res) {
    try {
        
        await userServices.createUser(req.body)
        res.status(201).send({message: 'User created successfully'})

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

module.exports = {
    createUser,
    login
}