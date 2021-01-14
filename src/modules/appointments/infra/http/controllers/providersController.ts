import {Request,Response} from 'express'
import {parseISO} from 'date-fns'
import {container} from 'tsyringe'

import ListProvidersService from "@modules/appointments/services/ListProvidersService";
import AdminDeleteProvidersService from "@modules/appointments/services/AdminDeleteProvidersService";
import { classToClass } from 'class-transformer';
import ListProviderByIdService from '@modules/appointments/services/ListProviderByIdServide';
class ProvidersController {

    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
    
        const { key } = request.query

        const listProviders = container.resolve(ListProvidersService);
    
        const providers = await listProviders.execute({
          user_id,key
        });
    
        return response.json(classToClass(providers));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        
        const { id } = request.params

        const user_id = id
    
        const listProviders = container.resolve(ListProviderByIdService);
    
        const providers = await listProviders.execute({
          user_id
        });
    
        return response.json(classToClass(providers));
    }

    public async destroy(request:Request,response:Response){

        const { provider_id,admin_id } = request.params

        const adminDeleteProvidersService = container.resolve(AdminDeleteProvidersService)

        const deletedUser = await adminDeleteProvidersService.execute({
            provider_id,
            admin_id
        })
        
        return response.json(deletedUser)
    }


}

export default ProvidersController