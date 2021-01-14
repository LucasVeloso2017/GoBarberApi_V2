import {getMongoRepository,MongoRepository} from 'typeorm'

import INotificationsRepositories from './../../../repositories/INotificationsRepositories';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepositories implements INotificationsRepositories {
    private notificationsRepository:MongoRepository<Notification>

    constructor(){
        this.notificationsRepository = getMongoRepository(Notification,'mongo')
    }

    public async create({content,recipient_id}:ICreateNotificationDTO):Promise<Notification>{
        
        const notification = this.notificationsRepository.create({content,recipient_id})
        await this.notificationsRepository.save(notification)
        return notification
    }
}

export default NotificationsRepositories