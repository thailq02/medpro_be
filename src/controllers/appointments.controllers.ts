import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {APPOINTMENTS_MESSAGE} from '~/constants/messages'
import {CreateAppointmentsReqBody} from '~/models/request/Appointment.request'
import appointmentService from '~/services/appointment.service'

export const createAppointmentsController = async (
  req: Request<ParamsDictionary, any, CreateAppointmentsReqBody>,
  res: Response
) => {
  await appointmentService.createAppointment(req.body)
  return res.json({message: APPOINTMENTS_MESSAGE.CREATE_SUCCESS})
}

export const getFullAppointmentsController = async (req: Request, res: Response) => {
  const result = await appointmentService.getFullAppointments()
  return res.json({
    message: APPOINTMENTS_MESSAGE.GET_SUCCESS,
    data: result
  })
}
