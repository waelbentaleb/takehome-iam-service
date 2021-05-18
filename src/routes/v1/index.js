import express from 'express'
import { isSuperAdmin, isAuthorizedBank, isAuthorizedClient } from '../../middleware/auth'
const router = express.Router()

import bankRoute from './bank/bankRoute'
import userRoute from './user/userRoute'
import authorizationRoute from './authorization/authorizationRoute'

router.use('/bank', isSuperAdmin, bankRoute)
router.use('/user/:bankId', isAuthorizedBank, userRoute)
router.use('/authorize/client/:userId', isAuthorizedClient, authorizationRoute)

export default router