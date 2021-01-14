import {inject,injectable } from 'tsyringe'

import nodemailer,{Transporter} from 'nodemailer'
import ISendForgotEmailPassword from '@shared/container/providers/mailProvider/models/IMailProvider'
import dtoISendeMail from '../dto/dtoISendMail'
import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider'

@injectable()
export default class EtherealMailProvider implements ISendForgotEmailPassword {
    private client:Transporter
    
    constructor(

        @inject('MailTemplateProvider')
        private mailTemplateProvider:IMailTemplateProvider
    ){
        nodemailer.createTestAccount().then(acount=>{
            const transporter = nodemailer.createTransport({
                host:acount.smtp.host,
                port:acount.smtp.port,
                secure:acount.smtp.secure,
                auth:{
                    user:acount.user,
                    pass:acount.pass
                }
            })
            
            this.client = transporter
        })
    }


    public async sendMail({to,from,subject,templateData}:dtoISendeMail):Promise<void>{
        await this.client.sendMail({
            from:{
                name:from?.name || 'Equipe Gobarber equipegobarber@gobarber.com.br',
                address:from?.name || 'equipegobarber@gobarber.com.br'
            },
            to:{
                name:to.name,
                address:to.email
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData)
        })
    }

}