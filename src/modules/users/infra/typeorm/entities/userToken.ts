import { Generated,CreateDateColumn,UpdateDateColumn, Entity,Column,PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_tokens')
class User_token{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Generated('uuid')
    token: string

    @Column()
    user_id:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}

export default User_token