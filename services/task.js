const { requireHelper } = require('../util/helper')
const Task = requireHelper('database/models/task')

async function createTask (taskData) {
    try {
        const taskStructure = {
            title: taskData.title,
            description: taskData.description,
            completed: taskData.completed,
            dueDate: taskData.dueDate,
            priority: taskData.priority
        }

        const task = new Task(taskStructure)
        await task.save()

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

module.exports = {
    createTask
}