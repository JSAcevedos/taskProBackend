const { requireHelper } = require('../util/helper')
const taskService = requireHelper('services/task')

async function createTask (req, res) {
    try {
        
        await taskService.createTask(req.body, req.userId)
        res.status(201).send({message: "Task created successfully"})

    } catch (error) {   
        if (error.message == 11000) {
          return res.status(400).send("Task already exists")
        }
        return res.status(500).send(error.message)
    }
}

async function getTask(req, res) {
  try {
    const task = await taskService.getTask(req.params.taskId)
    res.status(200).send(task)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await taskService.getAllTasks(req.userId)
    res.status(200).send(tasks)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function updateTask(req, res) {
  try {
    await taskService.updateTask(req.params.taskId, req.body)
    res.status(200).send({message: "Task updated successfully"})
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function completeTasks(req, res) {
  try {
    await taskService.completeTasks(req.body)
    res.status(200).send(true)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function uncompleteTasks(req, res) {
  try {
    await taskService.uncompleteTasks(req.body)
    res.status(200).send(true)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function deleteTask(req, res) {
  try {
    await taskService.deleteTask(req.body.taskId)
    res.status(200).send(true)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function deleteMultipleTasks(req, res) {
  try {
    await taskService.deleteMultipleTasks(req.body)
    res.status(200).send(true)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
    createTask,
    getTask,
    getAllTasks,
    updateTask, 
    completeTasks,
    uncompleteTasks,
    deleteTask,
    deleteMultipleTasks
}