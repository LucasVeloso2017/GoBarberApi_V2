import {Request,Response,NextFunction} from 'express'
import {verify, decode} from 'jsonwebtoken'


import AppError from '@shared/errors/appError'

import authConfig from '@config/config'

interface tokenPayload{
    iat:number,
    exp:number,
    sub:string
}

export default function ensureAuth(request:Request,response:Response,next:NextFunction):void{

    const authHeader = request.headers.authorization 

    if(!authHeader){
        throw new AppError('Missing Token',401)
    }

    const [,token] = authHeader.split(' ')

    try{

        const decoded =verify(token,authConfig.jwt.secret)

        const{ sub } = decoded as tokenPayload

        request.user = {
            id:sub
        }

        return next()
    }catch{
        throw new AppError('invalid JWT Token',401)
    }


}