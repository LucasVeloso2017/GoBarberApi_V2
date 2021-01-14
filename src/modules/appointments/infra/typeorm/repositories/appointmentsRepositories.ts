import  ICreateAppointmentDto  from '@modules/appointments/dtos/ICreateAppointmentDto';
import {getRepository,Repository,Raw} from 'typeorm'

import Appointments from '@modules/appointments/infra/typeorm/entities/appointments'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import IFindAllInMonthDto from '@modules/appointments/dtos/IFindAllInMonthDto'
import IFindAllInDayDto from '@modules/appointments/dtos/IFindAllInDayDto'

class AppointmentstRepository implements IAppointmentRepository {
    private ormRepository:Repository<Appointments>

    constructor(){
        this.ormRepository = getRepository(Appointments)
    }

    public async findByDate(date:Date): Promise<Appointments | undefined> {
       
        const findAppointment = await this.ormRepository.findOne({
            where:{ date }
        })

        return findAppointment
    }

    public async create({provider_id,user_id,date}:ICreateAppointmentDto):Promise<Appointments>{
        
        const appointment = this.ormRepository.create({provider_id,user_id,date})
        await this.ormRepository.save(appointment)
        return appointment
    } 

    public async findAllInMonthFromProvider({provider_id,month,year}:IFindAllInMonthDto):Promise<Appointments[]>{
        const parsedMonth = String(month).padStart(2,'0')

        const appointment = await this.ormRepository.find({
            where:{
                provider_id,
                date:Raw(dateFieldName => 
                    `to_char(${dateFieldName},'MM-YYYY') = '${parsedMonth}-${year}'`
                ),
            }
        })

        return appointment
    }

    public async findAllInDayFromProvider({provider_id,day,month,year}:IFindAllInDayDto):Promise<Appointments[]>{
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');
      
        
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    (dateFieldName)=>{
                        console.log(dateFieldName)
                        return `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                    }
                ),
            },
        });
        
        return appointments;
    }
}

export default AppointmentstRepository