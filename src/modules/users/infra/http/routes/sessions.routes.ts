import {Router } from 'express'

import { celebrate,Segments,Joi } from 'celebrate'

const sessionsRouter = Router()

import SessionController from '@modules/users/infra/http/controllers/sessionController'

const sessionController = new SessionController()
sessionsRouter.post('/',celebrate({
    [Segments.BODY]:{
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }
})
,sessionController.create)

export default sessionsRouter