const { Router } = require("express")
const { requireHelper } = require("../util/helper")
const userRoutes = requireHelper("routes/user")
const taskRoutes = requireHelper("routes/task")

const router = Router()

router.use("/user", userRoutes)
router.use("/task", taskRoutes)

module.exports = router;