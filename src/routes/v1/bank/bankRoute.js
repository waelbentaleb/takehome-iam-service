import express from 'express'
import { getAll, getById, create, remove } from './bankController'

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.delete('/:id', remove)

export default router