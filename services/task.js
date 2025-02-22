const { requireHelper } = require('../util/helper')
const Task = requireHelper('database/models/task')

async function createTask (taskData, userId) {
    try {
        const taskStructure = {
            title: taskData.title,
            description: taskData.description,
            dueDate: taskData.dueDate,
            priority: taskData.priority,
            userId: userId
        }

        const task = new Task(taskStructure)
        await task.save()

    } catch (error) {
        throw new Error(error.errorResponse.code ? error.errorResponse.code : error)
    }
}

async function getTask(taskId) {
  try {
    const task = await Task.findById(taskId).select("-_id -__v")

    return task
  } catch (error) {
    throw new Error(error)
  }
}

async function getAllTasks(userId) {
  try {
    const filter = {
      userId: userId,
    }
    const tasks = await Task.find(filter).select("-__v -userId")

    return tasks
  } catch (error) {
    throw new Error(error)
  }
}

async function updateTask(taskId, newTask) {
  try {
    await Task.findByIdAndUpdate(taskId, newTask).select("-__v -userId")

    return true
  } catch (error) {
    throw new Error(error)
  }
}

async function completeTasks(taskIds) {
  try {
    await Task.find({
      _id: {$in: taskIds}
    }).updateMany({
      completed: true
    })

    return true
  } catch (error) {
    throw new Error(error)
  }
}

async function uncompleteTasks(taskIds) {
  try {
    await Task.find({
      _id: {$in: taskIds}
    }).updateMany({
      completed: false
    })

    return true
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
    createTask,
    getTask,
    getAllTasks,
    updateTask, 
    completeTasks,
    uncompleteTasks
}