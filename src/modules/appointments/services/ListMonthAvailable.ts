import { inject,injectable } from 'tsyringe';
import {getDaysInMonth,getDate} from 'date-fns'


import User from '@modules/users/infra/typeorm/entities/user'
import  IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';

interface Request{
    provider_id:string
    month:number
    year:number

}

type Response = Array<{
    day:number
    available:boolean
}>

@injectable()
class ListMonthAvailable{

    constructor(
        @inject("AppointmentsRepository")
        private appoitmentsRepository:IAppointmentsRepository

    ){}
    
    public async execute({provider_id,month,year}:Request): Promise<Response>{
        const appoiments = await this.appoitmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month
        })

        const numberDaysinMonth = getDaysInMonth(
            new Date(year,month - 1)
        )

        const eachDayArray = Array.from(
            {length:numberDaysinMonth},
            (value,index) => index + 1,
        )

        const available = eachDayArray.map(day => {
            const appoimentsInDay = appoiments.filter(item=>{
                return getDate(item.date) === day
            })

            return {
                day,
                available:appoimentsInDay.length < 10
            }

        })    
        
        return available
    }
}

export default ListMonthAvailable