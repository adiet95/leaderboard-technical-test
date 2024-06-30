/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    username : string

    @Column()
    password : string

    @Column()
    score : number

    @Column()
    role : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}
