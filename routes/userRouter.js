const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddlware = require('../middlewares/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddlware, userController.auth)

module.exports = router