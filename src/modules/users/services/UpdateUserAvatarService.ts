import User from '@modules/users/infra/typeorm/entities/user'
import { inject,injectable } from 'tsyringe';


import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/storageProviders/models/IStorageProvider'

interface Request{
    user_id:string,
    avatarFilename:string
}


@injectable()
class UpdateUserAvatarService{

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        
        @inject("StorageProvider")
        private storageProvider:IStorageProvider
    ){}
    
    public async execute({user_id,avatarFilename}:Request): Promise<User>{

        const user = await this.userRepository.findById(user_id)

        if(!user){
            throw new AppError('Error not authenticate',401)
        }

        if(user.avatar){
            await this.storageProvider.deleteFile(user.avatar)                           
        }

        const filename = await this.storageProvider.saveFile(avatarFilename)

        user.avatar = filename

        await this.userRepository.save(user)

        return user
    }




}

export default UpdateUserAvatarService