import {Request,Response} from 'express'
import {container} from 'tsyringe'

import DayMonthAvailableService from "@modules/appointments/services/ListDayAvailable";
import { number } from '@hapi/joi';

class DayAvailableController {

    public async index(request:Request,response:Response){
        const { provider_id } = request.params
        const{ month, day, year }= request.query

        const listProvidersDayService = container.resolve(DayMonthAvailableService)

        const available = await listProvidersDayService.execute({
            provider_id,
            month:Number(month),
            day:Number(day),
            year:Number(year)
        })

        return response.json(available)
      
    }


}

export default DayAvailableController
