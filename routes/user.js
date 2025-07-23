const { Router } = require("express")
const { requireHelper } = require('../util/helper')
const userController = requireHelper('controllers/user')
const middlewares = requireHelper('middlewares/auth')
const { validateLogin, validateUser } = require('../middlewares/validators/userValidator');

const router = Router()

router.post('/create-user', validateUser, userController.createUser)
router.post('/login', validateLogin, userController.login);
router.post('/recover-password', userController.recoverPassword)
router.patch('/reset-password', userController.resetPassword)

router.use(middlewares.authMiddleware)
router.get('/get-user', userController.getUser)
router.patch('/update-user', userController.updateUser)
router.patch('/update-password', userController.updatePassword)
router.delete('/delete-user', userController.deleteUser)

module.exports = router