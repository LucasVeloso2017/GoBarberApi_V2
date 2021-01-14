import {Request,Response} from 'express'
import {parseISO} from 'date-fns'
import {container} from 'tsyringe'

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

class AppointmentsController {

    public async create(request:Request,response:Response){
        
        const user_id = request.user.id

        const {provider_id,date} = request.body

        const parsedDate = parseISO(date)

        console.log({
            date:parsedDate,
            user_id,
            provider_id
        })

        const createAppointmentService = container.resolve(CreateAppointmentService)

        const appointment = await createAppointmentService.execute({
            date:parsedDate,
            user_id,
            provider_id
        })

        return response.json(appointment)
    }


}

export default AppointmentsController