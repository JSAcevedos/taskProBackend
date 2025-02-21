const { requireHelper } = require('../util/helper')
const taskService = requireHelper('services/task')

async function createTask (req, res) {
    try {
        
        await taskService.createTask(req.body, req.userId)
        res.status(201).send({message: "Task created successfully"})

    } catch (error) {   
        if (error.message == 11000) {
          return res.status(400).send("Task already exists");
        }
        return res.status(500).send(error.message);
    }
}

async function getTask(req, res) {
  try {
    const task = await taskService.getTask(req.params.taskId);
    res.status(201).send(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await taskService.getAllTasks(req.userId);
    res.status(201).send(tasks);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
    createTask,
    getTask,
    getAllTasks
}