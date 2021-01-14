import {container} from 'tsyringe'

import IStorageProvider from '@shared/container/providers/storageProviders/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider'

import ISendForgotPasswordMail from '@shared/container/providers/mailProvider/models/IMailProvider'
import EtherealMailProvider from '@shared/container/providers/mailProvider/implementations/EtherealMailProvider'


import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'
import HashProvider from '@shared/container/providers/hashProvider/implementations/HashProviderService'

import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/implementations/handlebarsMailTemplateProvider'

import ICacheProvider from './cacheProvider/models/ICacheProvider';
import RedisCacheProvider from './cacheProvider/implementations/RedisCacheProvider';


container.registerSingleton<IStorageProvider>(
    'StorageProvider',DiskStorageProvider
)

container.registerSingleton<ICacheProvider>(
    'CacheProvider',RedisCacheProvider
)

container.registerSingleton<IHashProvider>(
    'HashProvider',HashProvider
)

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',HandlebarsMailTemplateProvider
)

container.registerInstance<ISendForgotPasswordMail>(
    'MailProvider',container.resolve(EtherealMailProvider)
)
