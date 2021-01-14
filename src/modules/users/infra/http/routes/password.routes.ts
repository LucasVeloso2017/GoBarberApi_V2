import { Router } from 'express'

import { celebrate,Segments,Joi } from 'celebrate'

import ForgotPasswordController from '@modules/users/infra/http/controllers/forgotPasswordController'
import ResetPasswordController from '@modules/users/infra/http/controllers/resetPasswordController'

const resetPasswordController = new ResetPasswordController()

const forgotPasswordController = new ForgotPasswordController()

const passwordRouter = Router()
passwordRouter.post('/forgot',celebrate({
    [Segments.BODY]:{
        email:Joi.string().email().required()
    }
})
,forgotPasswordController.create)

passwordRouter.post('/reset',resetPasswordController.create)
/*,celebrate({
    [Segments.BODY]:{
        token:Joi.string().uuid().required(),
        password:Joi.string().required(),
        password_confirmation:Joi.string().required().valid(Joi.ref('password'))
    }
})

*/
export default passwordRouter