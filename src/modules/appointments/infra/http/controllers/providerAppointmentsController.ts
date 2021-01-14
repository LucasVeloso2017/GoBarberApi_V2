import {Request,Response} from 'express'
import {container} from 'tsyringe'

import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";
import { classToClass } from 'class-transformer';
class ProviderAppointmentsController {

    public async index(request:Request,response:Response){
        
        const provider_id = request.user.id

        const { day,month,year } = request.query

        const listProviderAppointmentService = container.resolve(ListProviderAppointmentsService)

        const appointments = await listProviderAppointmentService.execute({
            day:Number(day),
            month:Number(month),
            year:Number(year),
            provider_id
        })

        //return response.json(classToClass(appointments))
        return response.json(appointments)
    }


}

export default ProviderAppointmentsController