import Joi from 'joi'

export default {
  create: Joi.object({
    bic: Joi.string().min(8).required(),
    name: Joi.string().min(4).required(),
    address: Joi.string().min(10).required(),
    swift: Joi.string().min(8).max(11).required()
  })
}