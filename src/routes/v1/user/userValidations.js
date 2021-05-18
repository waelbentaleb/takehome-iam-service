import Joi from 'joi'
import { JoiObjectId } from '../../../helpers/validator'

export default {
  enroll: Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().min(4).required(),
    address: Joi.string().min(4).required(),
    // bankId: JoiObjectId().required()
  })
}