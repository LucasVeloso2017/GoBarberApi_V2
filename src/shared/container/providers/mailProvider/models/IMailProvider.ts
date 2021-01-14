import dtoISendMail from '../dto/dtoISendMail'

export default interface IMailProvider{
    sendMail(data:dtoISendMail):Promise<void>
}