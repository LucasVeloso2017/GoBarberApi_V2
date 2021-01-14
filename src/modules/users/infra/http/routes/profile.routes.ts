import {Router} from 'express'
import { celebrate,Segments,Joi } from 'celebrate'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import ProfileController from '@modules/users/infra/http/controllers/profileController'

const profileController = new ProfileController()

const profileRouter = Router()

//profileRouter.use(ensureAuth)
profileRouter.put('/',celebrate({
    [Segments.BODY]:{
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        old_password:Joi.string(),
        password:Joi.string(),        
        password_confirmation:Joi.string().valid(Joi.ref('password'))
    }
}),profileController.update)
profileRouter.get('/',profileController.show)


export default profileRouter