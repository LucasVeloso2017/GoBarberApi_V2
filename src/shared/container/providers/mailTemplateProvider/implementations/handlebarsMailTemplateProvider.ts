import handlebars from 'handlebars'
import fs from 'fs'

import IMailTemplateProvider from "../models/IMailTemplateProvider";
import dtoIParserMailTemplate from "../dto/dtoIParseMailTemplate";


export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider{

    public async parse({file,variables}:dtoIParserMailTemplate):Promise<string>{
        const templateFile = await fs.promises.readFile(file,{
            encoding:'utf-8',
        })
        const parseTemplate = handlebars.compile(templateFile)
        return parseTemplate(variables)
    }

}