import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Products } from "./Products";

@Entity()
export class CarroModelo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column("integer")
    año: number;

    @ManyToMany(() => Products, (product) => product.modeloCompatible)
    products: Products[];
}
