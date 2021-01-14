import dtoIParseEmail from '@shared/container/providers/mailTemplateProvider/dto/dtoIParseMailTemplate'

interface IMailContact{
    name:string
    email:string
}


export default interface dtoISendeMail{
    to:IMailContact
    from?:IMailContact
    subject:string
    templateData:dtoIParseEmail
}