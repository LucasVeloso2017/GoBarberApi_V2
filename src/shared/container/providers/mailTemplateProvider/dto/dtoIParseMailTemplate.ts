interface ITemplateVariables{
    [key:string]:string | number
}

export default interface dtoIParserMailTemplate{
    file:string
    variables:ITemplateVariables
}