const { Router } = require("express")
const { requireHelper } = require("../util/helper")
const userRoutes = requireHelper("routes/user")

const router = Router()

router.use("/user", userRoutes)

module.exports = router;