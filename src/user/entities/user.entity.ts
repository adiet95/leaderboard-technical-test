/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Exclude()
    id : number

    @Column()
    name : string

    @Column()
    @Exclude()
    username : string

    @Column()
    @Exclude()
    password : string

    @Column()
    score : number

    @Column()
    @Exclude()
    role : string

    @CreateDateColumn()
    @Exclude()
    createdAt : Date

    @UpdateDateColumn()
    @Exclude()
    updatedAt : Date

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
}
