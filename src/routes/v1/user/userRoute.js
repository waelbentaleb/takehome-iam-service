import express from 'express'
import { enroll, getAll, getById, update, remove } from './userController'

const router = express.Router()

router.post('/', enroll)
router.get('/', getAll)
router.get('/:userId', getById)
router.put('/:userId', update)
router.delete('/:userId', remove)

export default router