import { User } from 'src/user/entities/user.entity';
import {Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: string;

    @Column()
    category: string;

    @Column()
    company: string;

    // @Column()
    // userId: string;

    // @ManyToOne(() => User, (user) => user.products)
    // user: User
}
