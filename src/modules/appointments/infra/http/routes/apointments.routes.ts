import {Router} from 'express'
import { celebrate,Segments,Joi } from 'celebrate'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import AppointmentsController from '@modules/appointments/infra/http/controllers/appointmentsController'
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/providerAppointmentsController';



const appointmentsRouter = Router()

const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuth)

appointmentsRouter.post('/',appointmentsController.create)
appointmentsRouter.get('/me',providerAppointmentsController.index)

export default appointmentsRouter
/*
celebrate({
    [Segments.BODY]:{
        provider_id:Joi.string().uuid().required(),
        //date:Joi.string()
    }

})*/