import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'
import authConfig from '@config/config'


import User from '@modules/users/infra/typeorm/entities/user'

interface Request{
    email:string,
    password:string
}
interface Response{
    user:User,
    token:string
}

@injectable()
class AuthUserService{

    constructor(
        @inject("UsersRepository")
        private usersRepository:IUserRepository,
        
        @inject("HashProvider")
        private hashProvider:IHashProvider,
    ){}

    public async execute({email,password}:Request):Promise<Response>{
      

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('Incorrect Email/Password',401)
        }

        const passwordMacthed = await this.hashProvider.compareHash(password, user.password)

        if(!passwordMacthed){
            throw new AppError('Incorrect Email/Password',401)
        }

        const{ secret , expiresIn}=authConfig.jwt

        const token = sign({ 

        },
        secret,
        {
            subject:user.id,
            expiresIn
        })

        return { user,token }

    }   


}
export default AuthUserService