const { Router } = require("express")
const { requireHelper } = require('../util/helper')
const userController = requireHelper('controllers/user')

const router = Router()

router.post('/create-user', userController.createUser)

module.exports = router