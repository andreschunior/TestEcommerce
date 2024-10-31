import { Entity,Column,PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Credential } from "./credentials"

// import { credential } from "./credentials"

@Entity({
    name : "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id:number 

    @Column({
        length: 50
    })
    name: string // VARCHAR (50)

    @Column(({
        length: 50
    }))
    email:string  // VARCHAR (50)

    @Column()
    birthdate: Date 

    @Column("integer")
    nDni: number  //integres = numero entero

    @Column()
    active:boolean

    @OneToOne(()=>Credential)
    @JoinColumn()
    credentialsid : Credential

}

// , { eager: true }

    // @OneToOne(()=> credential)
    // @JoinColumn()
    // credential : credent


// interface IUser {
    // id:number ,
    // name: string,
    // email:string,
    // birthdate: Date ,
    // nDni: number,
    // credentialsId: number ,
    // active:boolean
// }
