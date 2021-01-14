import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'
import User from '@modules/users/infra/typeorm/entities/user'


interface Request{
    id:string
}

@injectable()
class FindUserByIdService{
    
    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        
        @inject("HashProvider")
        private hashProvider:IHashProvider,
    ){}
    
    public async execute({id}:Request): Promise<User>{

        const checkUserExists = await this.userRepository.findById(id) 
        
        if(!checkUserExists){
            throw new AppError('This id not exists')
        }

        return checkUserExists
    }


}

export default FindUserByIdService