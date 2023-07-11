const { Router } = require('express')
const { accessoriesController } = require('../controllers/accessories.controller')

const router = Router()

router.get('/accessories', accessoriesController.getAllAccessories) // роут для вывода всех аксессуаров
router.get('/accessories/:id', accessoriesController.getAccessoryById) // роут для вывода аксессуара по ID
router.post('/accessories', accessoriesController.addAccessory) // роут для создания аксессуара

module.exports  = router