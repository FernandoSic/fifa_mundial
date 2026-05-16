const express = require('express')
const { generate, save, create, getAll, getById, update, remove } = require('../controllers/grupo.controller')

const router = express.Router()

router.post('/generar', generate)
router.post('/save', save)
router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', remove)

module.exports = router
