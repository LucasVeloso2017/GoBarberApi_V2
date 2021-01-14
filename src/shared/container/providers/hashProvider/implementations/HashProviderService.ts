import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'
import { compare,hash } from 'bcryptjs'

export default class HashProvider implements IHashProvider {
  
    public async generateHash(password:string):Promise<string>{
        const pass = hash(password,8)
        return pass
    }
    
    public async compareHash(password:string,hashedPassword:string):Promise<boolean>{
        const compared = compare(password,hashedPassword)
        return compared
    }


}

