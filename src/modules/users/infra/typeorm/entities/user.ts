import { CreateDateColumn,UpdateDateColumn, Entity,Column,PrimaryGeneratedColumn } from 'typeorm'

import {Exclude, Expose} from 'class-transformer'

@Entity('users')
class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    avatar: string

    //new add - 01/12/2020 - column for admin user
    @Column({default:false})
    admin: boolean
    //----------------

    //new add - 02/12/2020 - column for costumer user
    @Column({default:false})
    costumer: boolean
    //----------------

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
    
    @Expose({name:'avatar_url'})
    getAvatarUrl():string | null{
        return this.avatar?`http://${process.env.APP_MOBILE_DEV_URL}/files/${this.avatar}`:null
    }

}

export default User