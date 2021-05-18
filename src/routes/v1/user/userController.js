import User from './user'
import Bank from '../bank/bank'
import uuidAPIKey from 'uuid-apikey'
import validationSchema from './userValidations'
import validator from '../../../helpers/validator'
import successResponse from '../../../helpers/successResponse'
import { BadRequestError, NotFoundError } from '../../../helpers/ApiError'


export async function enroll(req, res, next) {
  try {
    validator(validationSchema.enroll, req.body)

    let userObject = await User.findOne({ bankId: req.bank._id, email: req.body.email })
    if (userObject)
      throw new BadRequestError('account already exist')

    userObject = {
      ...req.body,
      bankId: req.bank._id,
      apikey: uuidAPIKey.create().apiKey
    }

    userObject = await User.create(userObject)

    return successResponse(res, userObject)

  } catch (error) { next(error) }
}

export async function getAll(req, res, next) {
  try {

    const userList = await User.find({ bankId: req.bank._id }).select('-apikey')

    return successResponse(res, userList)

  } catch (error) { next(error) }
}

export async function getById(req, res, next) {
  try {

    let userObject = await User.findOne({ bankId: req.bank._id, _id: req.params.userId })
    if (!userObject)
      throw new NotFoundError('user account not found')

    return successResponse(res, userObject)

  } catch (error) { next(error) }
}

export async function update(req, res, next) {
  try {
    validator(validationSchema.enroll, req.body)

    let userObject = await User.findOne({ bankId: req.bank._id, _id: req.params.userId })
    if (!userObject)
      throw new NotFoundError('user account not found')

    await userObject.update(req.body)

    return successResponse(res, { success: true })

  } catch (error) { next(error) }
}

export async function remove(req, res, next) {
  try {

    let userObject = await User.findOne({ bankId: req.bank._id, _id: req.params.userId })
    if (!userObject)
      throw new NotFoundError('user account not found')

    await User.delete({ _id: req.params.userId })

    return successResponse(res, { success: true })

  } catch (error) { next(error) }
}