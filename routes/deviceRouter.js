const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.get)
router.get('/:id', deviceController.getOne)

module.exports = router