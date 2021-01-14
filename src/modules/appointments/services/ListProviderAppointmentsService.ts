import { inject,injectable } from 'tsyringe';
import moment from 'moment'

import  IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointments from '../infra/typeorm/entities/appointments';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface Request{
    provider_id:string
    day:number
    month:number
    year:number
}

@injectable()
class ListProviderAppointmentsService{

    constructor(
        @inject("AppointmentsRepository")
        private appoitmentsRepository:IAppointmentsRepository,

        @inject("UsersRepository")
        private userRepository:IUserRepository,
    ){}
    
    public async execute({provider_id,day,month,year}:Request): Promise<Appointments[]>{
        const appointments = await this.appoitmentsRepository.findAllInDayFromProvider({
            provider_id,day,month,year
        })
        return appointments
    }
}

export default ListProviderAppointmentsService