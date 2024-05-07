import {Router} from 'express'
import {
  createDoctorsController,
  deleteDoctorsController,
  getDoctorsByIdController,
  getFullDoctorsController,
  updateDoctorsController
} from '~/controllers/doctors.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator, paginationValidator} from '~/middlewares/common.middlewares'
import {checkParamsDoctorsID, createDoctorsValidator, updateDoctorsValidator} from '~/middlewares/doctors.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateDoctorsReqBody} from '~/models/request/Doctor.request'
import {wrapRequestHandler} from '~/utils/handlers'

const doctorsRouter = Router()

/**
 * Desscription: Create information doctors
 * Path: /doctors/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { DoctorsSchema }
 */
doctorsRouter.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  createDoctorsValidator,
  wrapRequestHandler(createDoctorsController)
)

/**
 * Desscription: Update information doctors
 * Path: /doctors/update/:doctor_id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { DoctorsSchema }
 * Params: { doctor_id: string }
 */
doctorsRouter.patch(
  '/update/:doctor_id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsDoctorsID,
  updateDoctorsValidator,
  filterMiddleware<UpdateDoctorsReqBody>(['description', 'session', 'price', 'therapy', 'specialty_id']),
  wrapRequestHandler(updateDoctorsController)
)

/**
 * Desscription: Delete doctors
 * Path: /doctors/delete/:doctor_id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { doctor_id: string }
 */
doctorsRouter.delete(
  '/delete/:doctor_id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsDoctorsID,
  wrapRequestHandler(deleteDoctorsController)
)

/**
 * Desscription: Get doctors by id
 * Path: /doctors/:doctor_id
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { doctor_id: string }
 */
doctorsRouter.get('/:doctor_id', checkParamsDoctorsID, wrapRequestHandler(getDoctorsByIdController))

/**
 * Desscription: Get doctors
 * Path: /doctors
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 * Query: { limit: number, page: number }
 */
doctorsRouter.get('/', paginationValidator, wrapRequestHandler(getFullDoctorsController))
export default doctorsRouter
