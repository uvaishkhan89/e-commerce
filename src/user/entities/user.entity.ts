import { Product } from "src/product/entities/product.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // @OneToMany(() => Product, (product) => product.user)
    // products: Product[]
}

