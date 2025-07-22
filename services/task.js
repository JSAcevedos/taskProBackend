const { requireHelper } = require('../util/helper')
const Task = requireHelper('database/models/task')
const Auditoria = requireHelper('services/audit/auditMongo.js'); 





async function logAuditoria({ userId, accion, recurso, idRecurso, datos }) {
  try {
    await Auditoria.create({
      userId,
      accion,
      recurso,
      idRecurso,
      datos,
      fecha: new Date()
    });
  } catch (error) {
    console.error("Error al registrar auditoría:", error.message);
  }
}



async function createTask(taskData, userId) {
  try {
    const taskStructure = {
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      userId: userId
    };

    const task = new Task(taskStructure);
    await task.save();

    await logAuditoria({
      userId,
      accion: 'CREATE_TASK',
      recurso: 'task',
      idRecurso: task._id,
      datos: taskData
    });

  } catch (error) {
    throw new Error(error.errorResponse?.code || error);
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
      userId: userId
    }

    const tasks = await Task.find(filter)
      .select("-__v -userId")
      .sort({
        completed: 1,
        dueDate: 1
      })

    return tasks
  } catch (error) {
    throw new Error(error)
  }
}

async function updateTask(taskId, newTask) {
  try {
    await Task.findByIdAndUpdate(taskId, newTask).select("-__v -userId");

    await logAuditoria({
      userId: newTask.userId, // o pásalo desde fuera si no lo tienes aquí
      accion: 'UPDATE_TASK',
      recurso: 'task',
      idRecurso: taskId,
      datos: newTask
    });

    return true;
  } catch (error) {
    throw new Error(error.errorResponse?.code || error);
  }
}

async function completeTasks(taskIds) {
  try {
    await Task.updateMany(
      { _id: { $in: taskIds } },
      { completed: true }
    );

    await logAuditoria({
      userId: null, // pásalo si lo tienes
      accion: 'COMPLETE_TASKS',
      recurso: 'task',
      idRecurso: null,
      datos: { taskIds }
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function uncompleteTasks(taskIds) {
  try {
    await Task.updateMany(
      { _id: { $in: taskIds } },
      { completed: false }
    );

    await logAuditoria({
      userId: null,
      accion: 'UNCOMPLETE_TASKS',
      recurso: 'task',
      idRecurso: null,
      datos: { taskIds }
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteTask(taskId) {
  try {
    await Task.findByIdAndDelete(taskId);

    await logAuditoria({
      userId: null,
      accion: 'DELETE_TASK',
      recurso: 'task',
      idRecurso: taskId,
      datos: null
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteMultipleTasks(taskIds) {
  try {
    await Task.deleteMany({ _id: { $in: taskIds } });

    await logAuditoria({
      userId: null,
      accion: 'DELETE_MULTIPLE_TASKS',
      recurso: 'task',
      idRecurso: null,
      datos: { taskIds }
    });

    return true;
  } catch (error) {
    throw new Error(error);
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