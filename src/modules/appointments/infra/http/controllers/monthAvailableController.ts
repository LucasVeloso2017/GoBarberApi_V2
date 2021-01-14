import {Request,Response} from 'express'
import {container} from 'tsyringe'

import ListMonthAvailableService from "@modules/appointments/services/ListMonthAvailable";

class MonthAvailableController {

    public async index(request:Request,response:Response){
        const { provider_id } = request.params
        const{month, year }= request.query

        const listProvidersMonthService = container.resolve(ListMonthAvailableService)

        const available = await listProvidersMonthService.execute({
            provider_id,
            month:Number(month),
            year:Number(year)
        })

        return response.json(available)
      
    }


}

export default MonthAvailableController