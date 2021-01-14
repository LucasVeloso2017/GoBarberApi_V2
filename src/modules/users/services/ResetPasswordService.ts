import { inject,injectable } from 'tsyringe';
import { isAfter, addHours} from 'date-fns' 

import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import ISendForgotPasswordMail from '@shared/container/providers/mailProvider/models/IMailProvider'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'
import User from '@modules/users/infra/typeorm/entities/user'


interface Request{
    password:string
    token:string
}

@injectable()
export default class ResetPassword {

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        @inject("UsersTokenRepository")
        private userTokensRepository:IUserTokensRepository,

        @inject("HashProvider")
        private hashProvider:IHashProvider,
    
    ){}
    
    public async execute({password,token}:Request): Promise<void>{
        const userToken  = await this.userTokensRepository.findByToken(token)
        
        if(!userToken){
            throw new AppError("UserToken doesnt exists")
        }

        const user = await this.userRepository.findById(userToken.user_id)

        if(!user){
            throw new AppError("User doesnt exists")
        }

        const tokenCreatedAt = userToken.created_at
        const comparedDate = addHours(tokenCreatedAt,2)

        if(isAfter(Date.now(),comparedDate)){
            throw new AppError('Token has been expired')
        }


        user.password = await this.hashProvider.generateHash(password)

        await this.userRepository.save(user)
    }

}