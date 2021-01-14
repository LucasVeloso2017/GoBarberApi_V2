import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import ISendForgotPasswordMail from '@shared/container/providers/mailProvider/models/IMailProvider'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import path from 'path'


interface Request{
    email:string
}

@injectable()
export default class SendForgotEmailPasswordService {

    constructor(
        @inject("UsersTokenRepository")
        private userTokensRepository:IUserTokensRepository,
        
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        @inject("MailProvider")
        private mailProvider:ISendForgotPasswordMail,

    ){}
    
    public async execute({email}:Request): Promise<void>{
       
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError("User does not exist")
        }

        const {token} = await this.userTokensRepository.generate(user.id)

        const forgotPasswordTemplate = path.resolve(__dirname,'..','views','forgot_password.hbs')

        await this.mailProvider.sendMail({
            to:{
                name:user.name,
                email:user.email
            },
            subject:'[Gobarber] - Recuperação de senha',
            templateData:{
                file:forgotPasswordTemplate,
                variables:{
                    name:user.name,
                    token,
                    link:`http://${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
        })
    }

}