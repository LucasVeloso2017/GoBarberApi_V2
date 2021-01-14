import 'reflect-metadata'
import 'dotenv/config'
import express, { NextFunction,Request,Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import routes from './routes'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/appError'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()
app.use(express.json())

app.use(cors())

app.use('/files',express.static(uploadConfig.uploadsFolder))

app.use(routes)

app.use(errors())
app.use((err:Error, request:Request,  response:Response, next:NextFunction)=>{
    if(err instanceof AppError){
        response.status(err.statusCode).json({
            status:'error',
            message:err.message
        })
    }

    return response.status(500).json({
        status:'error',
        message:err.message
    })
})

app.listen(3333,()=>{
    console.log('backend on')
})