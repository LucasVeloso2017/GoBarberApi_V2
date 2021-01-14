import { inject,injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/appError';

interface Request{
    provider_id:string
    admin_id:string
}


@injectable()
class AdminDeleteProvidersService{

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,
    ){}
    
    public async execute({provider_id,admin_id}:Request): Promise<User | undefined>{
        const user = await this.userRepository.findById(admin_id)
        const provider = await this.userRepository.findById(provider_id)

        if(!user){
            throw new AppError("There is no user with this id")
        }
        if(!provider){
            throw new AppError("There is no provider with this id")
        }

        if(!user?.admin){
            throw new AppError("You must be an administrator to remove a user")
        }

        const deleted = await this.userRepository.deleteById(provider_id)

        return deleted
    }
}

export default AdminDeleteProvidersService