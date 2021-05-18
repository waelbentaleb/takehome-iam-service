import Bank from './bank'
import uuidAPIKey from 'uuid-apikey'
import validationSchema from './bankValidations'
import validator from '../../../helpers/validator'
import successResponse from '../../../helpers/successResponse'
import { BadRequestError, NotFoundError } from '../../../helpers/ApiError'


export async function getAll(req, res, next) {
  try {
    const bankList = await Bank.find().select('-apikey')
    return successResponse(res, bankList)

  } catch (error) { next(error) }
}

export async function getById(req, res, next) {
  try {

    const bankObject = await Bank.findOne({ _id: req.params.id })

    if (!bankObject)
      throw new NotFoundError('Bank not found')

    return successResponse(res, bankObject)

  } catch (error) { next(error) }
}

export async function create(req, res, next) {
  try {
    validator(validationSchema.create, req.body)

    let bankObject = await Bank.findOne({ bic: req.body.bic })

    if (bankObject)
      throw new BadRequestError('bank already exist')

    req.body.apikey = uuidAPIKey.create().apiKey
    bankObject = await Bank.create(req.body)

    return successResponse(res, bankObject)

  } catch (error) { next(error) }
}

export async function remove(req, res, next) {
  try {

    const bank = await Bank.findOne({ _id: req.params.id })

    if (!bank)
      throw new NotFoundError('Bank not found')

    await Bank.delete({ _id: req.params.id })

    return successResponse(res, { success: true })

  } catch (error) { next(error) }
}