import dtoIParseMailTemplate from '@shared/container/providers/mailTemplateProvider/dto/dtoIParseMailTemplate'

export default interface IMailTemplateProvider{
    parse(data:dtoIParseMailTemplate):Promise  <string>
}