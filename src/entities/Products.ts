import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { CarroModelo } from "./ModelosDeCarros";
// import { AutoModelo } from "./modelosAutos";


@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 250 })
    descripcion: string;

    @Column("integer")
    precio?: number;

    @Column("integer")
    stock: number;

    @Column()
    categoria?: string;

    @Column()
    imagenURL?: string;

    // Relación con AutoModelo
    @ManyToMany(() => CarroModelo, (CarroModelo) => CarroModelo.products)
    @JoinTable()  // Especifica que esta entidad es la propietaria de la relación
    modeloCompatible: CarroModelo[];
}
