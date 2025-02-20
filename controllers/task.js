const { requireHelper } = require('../util/helper')
const taskService = requireHelper('services/task')

async function createTask (req, res) {
    try {
        
        await taskService.createTask(req.body)
        res.status(201).send({message: "Task created successfully"})

    } catch (error) {   
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createTask
}