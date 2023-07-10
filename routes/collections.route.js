const { Router } = require('express')
const { collectionsController } = require('../controllers/collections.controller')

const router = Router()

router.get('/collections', collectionsController.getAllCollections) // роут для вывода всех коллекция
router.get('/collections/:id', collectionsController.getCollectionById) // роут для вывода коллекции по ID
router.post('/collections', collectionsController.addCollection) // роут для создания коллекции

module.exports  = router