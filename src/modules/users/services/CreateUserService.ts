import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'
import User from '@modules/users/infra/typeorm/entities/user'


interface Request{
    name:string,
    email:string,
    admin:boolean,
    costumer:boolean,
    password:string
}

@injectable()
class CreateUserService{
    
    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        
        @inject("HashProvider")
        private hashProvider:IHashProvider,
    ){}
    
    public async execute({name,email,password,admin,costumer}:Request): Promise<User>{

        const checkUserExists = await this.userRepository.findByEmail(email) 
        
        if(checkUserExists){
            throw new AppError('This email already exists')
        }

        const hashedPassword = await this.hashProvider.generateHash(password)


        const user = this.userRepository.create({
            name,
            email,
            admin,
            costumer,
            password:hashedPassword
        })
        
        return user
    }


}

export default CreateUserService