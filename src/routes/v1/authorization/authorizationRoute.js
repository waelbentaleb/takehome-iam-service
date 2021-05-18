import express from 'express'
import { authorize } from './authorizationController'

const router = express.Router()

router.post('/', authorize)

export default router