const { Router } = require('express')
const { categoriesController } = require('../controllers/categories.controller')

const router = Router()

router.get('/categories', categoriesController.getAllCategories) // роут для вывода всех категорий
router.get('/categories/:id', categoriesController.getCategoryById) // роут для вывода категории по ID
router.post('/categories', categoriesController.addCategory) // роут для создания категории

module.exports  = router