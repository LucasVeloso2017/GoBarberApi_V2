import { inject,injectable } from 'tsyringe';
import {getHours,isAfter} from 'date-fns'


import User from '@modules/users/infra/typeorm/entities/user'
import  IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';

interface Request{
    provider_id:string
    month:number
    day:number
    year:number

}

type Response = Array<{
    hour:number
    available:boolean
}>

@injectable()
class ListDayAvailable{

    constructor(
        @inject("AppointmentsRepository")
        private appoitmentsRepository:IAppointmentsRepository

    ){}
    
    public async execute({provider_id,month,day,year}:Request): Promise<Response>{
        const appointments = await this.appoitmentsRepository.findAllInDayFromProvider({
            provider_id,
            month,
            day,
            year
        })

        console.log(appointments)

        const hourStart = 8

        const eachHourArray = Array.from({length:10},(_,index)=> index + hourStart)
        
        const currentDate = new Date(Date.now())

        const available = eachHourArray.map(hour=>{
            const hasAppointmentInHour = appointments.find(appointments =>
                getHours(appointments.date) === hour   
            )

            const compareDate = new Date(year,month - 1, day, hour)

            return{
                hour,
                available:!hasAppointmentInHour && isAfter(compareDate,currentDate)
            }   
        
        })

        return available
    }
}

export default ListDayAvailable