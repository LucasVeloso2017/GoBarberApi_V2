import './providers'
import { container } from 'tsyringe'

import  AppointmentsRepository  from '@modules/appointments/infra/typeorm/repositories/appointmentsRepositories';
import  IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';

import  IUserRepository from '@modules/users/repositories/IUserRepository';
import  UsersRepository  from '@modules/users/infra/typeorm/repositories/usersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';


import INotificationsRepositories from '@modules/notifications/repositories/INotificationsRepositories'
import NotificationsRepositories from '@modules/notifications/infra/typeorm/repositories/NotificationsRepositories';


container.registerSingleton<IUserRepository>('UsersRepository',UsersRepository)
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository',AppointmentsRepository)
container.registerSingleton<IUserTokensRepository>('UsersTokenRepository',UsersTokenRepository)

container.registerSingleton<INotificationsRepositories>('NotificationsRepositories',NotificationsRepositories)

