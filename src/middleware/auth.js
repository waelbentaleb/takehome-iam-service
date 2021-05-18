import Bank from '../routes/v1/bank/bank'
import User from '../routes/v1/user/user'
import { ADMIN_KEY } from '../config/env'
import { UnauthorizedError } from '../helpers/ApiError'

export const isSuperAdmin = async (req, res, next) => {
  try {
    const apikey = req.headers.authorization

    if (!apikey || apikey != ADMIN_KEY)
      throw new UnauthorizedError('Unauthorized action')

    next()
  } catch (error) { next(error) }
}

export const isAuthorizedBank = async (req, res, next) => {
  try {
    const apikey = req.headers.authorization

    if (!apikey)
      throw new UnauthorizedError('Unauthorized action')

    const bankObject = await Bank.findOne({ _id: req.params.bankId, apikey })

    if (!bankObject)
      throw new UnauthorizedError('Unauthorized action')

    req.bank = bankObject

    next()
  } catch (error) { next(error) }
}

export const isAuthorizedClient = async (req, res, next) => {
  try {
    const apikey = req.body.apikey

    if (!apikey)
      throw new UnauthorizedError('Unauthorized action')

    const userObject = await User.findOne({ _id: req.params.userId, apikey })

    if (!userObject)
      throw new UnauthorizedError('Unauthorized action')

    req.user = userObject

    next()
  } catch (error) { next(error) }
}