import  Appointments  from '@modules/appointments/infra/typeorm/entities/appointments';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto'
import IFindAllInMonthDto from '@modules/appointments/dtos/IFindAllInMonthDto'
import IFindAllInDayDto from '@modules/appointments/dtos/IFindAllInDayDto'

export default interface IAppointmentsRepository{

    findByDate(date:Date):Promise<Appointments | undefined>
    create(data:ICreateAppointmentDto):Promise<Appointments>
    findAllInMonthFromProvider(data:IFindAllInMonthDto):Promise<Appointments[]>
    findAllInDayFromProvider(data:IFindAllInDayDto):Promise<Appointments[]>
}