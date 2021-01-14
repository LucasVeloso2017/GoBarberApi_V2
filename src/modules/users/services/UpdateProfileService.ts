import User from '@modules/users/infra/typeorm/entities/user'
import { inject,injectable } from 'tsyringe';


import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'

interface Request{
    user_id:string
    name:string
    email:string
    old_password:string
    password?:string
}


@injectable()
class UpdateProfileService{

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        
        @inject("HashProvider")
        private hashProvider:IHashProvider,

    ){}
    
    public async execute({user_id,name,email,password,old_password}:Request): Promise<User>{
        const user  = await this.userRepository.findById(user_id)

        if(!user){
            throw new AppError("User not Found")
        }

        const userWithUpdatedEmail = await this.userRepository.findByEmail(email)

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id){
            throw new AppError("This email already used") 
        }

        user.name = name
        user.email = email

        if(password && !old_password){
            throw new AppError("You need to inform the old password to set a new password")
        }
        
        if(password && old_password){
            
            const checkOldPass = await this.hashProvider.compareHash(old_password,user.password)
       
            if(!checkOldPass){
                throw new AppError("Old doesnt match")
            }

            user.password = await this.hashProvider.generateHash(password)
        }

        return await this.userRepository.save(user)
    }
}

export default UpdateProfileService