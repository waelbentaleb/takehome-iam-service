import successResponse from '../../../helpers/successResponse'

export async function authorize(req, res, next) {
  try {
    return successResponse(res, req.user)
  } catch (error) { next(error) }
}