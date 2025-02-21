const { Router } = require("express")
const { requireHelper } = require('../util/helper')
const taskController = requireHelper('controllers/task')
const middlewares = requireHelper('middlewares/auth')

const router = Router()

router.use(middlewares.authMiddleware)
router.post('/create-task', taskController.createTask)
router.get("/get-task/:taskId", taskController.getTask);
router.get("/get-all-tasks", taskController.getAllTasks);

module.exports = router