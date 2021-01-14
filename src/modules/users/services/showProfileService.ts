import { inject,injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user'
import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';

interface Request{
    user_id:string
}


@injectable()
class ShowProfileService{

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository
    ){}
    
    public async execute({user_id}:Request): Promise<User>{
        const user  = await this.userRepository.findById(user_id)

        if(!user){
            throw new AppError("User not Found")
        }

        return user
    }
}

export default ShowProfileService