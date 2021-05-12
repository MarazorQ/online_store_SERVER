const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRoleMiddlware = require('../middlewares/checkRoleMiddlware')

router.post('/', checkRoleMiddlware('ADMIN'), typeController.create)
router.get('/', typeController.get)

module.exports = router