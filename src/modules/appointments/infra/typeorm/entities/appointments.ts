import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn 
} from 'typeorm'

import {Exclude, Expose} from 'class-transformer'

import User from '@modules/users/infra/typeorm/entities/user'
import { container } from 'tsyringe'

@Entity('appointments')
class Appointments{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string

    @ManyToOne(()=> User,user => user.id,{
        eager: true
    })
    @JoinColumn({name:'provider_id'})
    provider:User

    @Column()
    user_id: string

    @ManyToOne(()=> User,user => user.id,{
        eager: true
    })
    @JoinColumn({name:'user_id'})
    user:User

    @Column('timestamp with time zone')
    date: Date

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
    /*
    @Expose({name:'costumer'})
    getAvatarUrl():any{
    }
    */

}

export default Appointments