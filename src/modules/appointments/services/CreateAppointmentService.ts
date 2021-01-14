import { startOfHour,isBefore,getHours,format } from 'date-fns';
import {inject,injectable} from 'tsyringe'

import Appointments from '@modules/appointments/infra/typeorm/entities/appointments'
import AppError from '@shared/errors/appError'
import  IAppointmentRepository  from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepositories from '@modules/notifications/repositories/INotificationsRepositories';


interface Request{

    provider_id:string
    user_id:string
    date:Date
}

@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository:IAppointmentRepository,

        @inject('NotificationsRepositories')
        private notificationsRepositories:INotificationsRepositories,
    ){}


    public async execute({provider_id,user_id,date}:Request): Promise<Appointments>{

        const appointmentDate = startOfHour(date)

        if(provider_id === user_id){
            throw new AppError('You cant create an appointment with yourself')
        }

        if(isBefore(appointmentDate, new Date(Date.now()))){
            throw new AppError('You cant create appointment in past date')
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)

        if(findAppointmentInSameDate){
            throw new AppError('this appointment this already booked')
        }
        
        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
            throw new AppError('You cant only create appointments between 8:00 to 17:00 ')
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date:appointmentDate
        })

        const dateFormated = format(appointmentDate,"dd/MM/yyyy 'às' HH:mm'h'")

        await this.notificationsRepositories.create({
            recipient_id:provider_id,
            content:`Novo Agendamento para dia ${dateFormated}`
        })

        return appointment
    }

}

export default CreateAppointmentService