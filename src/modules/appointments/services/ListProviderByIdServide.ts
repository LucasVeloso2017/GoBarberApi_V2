import { inject,injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';

interface Request{
    user_id:string
}


@injectable()
class ListProviderByIdService{

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,
    ){}
    public async execute({user_id}:Request): Promise<User>{

        const users = await this.userRepository.findById(user_id)

        if(!users){
            throw new Error("User not Found")
        }
        
        return users
        
    }
}

export default ListProviderByIdService