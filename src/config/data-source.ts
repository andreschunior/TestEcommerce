import { DataSource } from "typeorm"
import { User } from "../entities/users"
import { Credential } from "../entities/credentials"

import { Repository } from 'typeorm';
import { PORTPOSGRE,DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME } from "./envs";
import { Products } from "../entities/Products";
import { CarroModelo } from "../entities/ModelosDeCarros";



export const AppDataSource = new DataSource({
    type: "postgres",
    host:"localhost",
    port: 5432,
    username: "postgres",
    password: "Circuitos1",
    database: "ecommercetest",
   //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User,Credential,Products,CarroModelo],
    subscribers: [],
    migrations: [],

})

export const userModel: Repository<User> = AppDataSource.getRepository(User);
export const credentialModel = AppDataSource.getRepository(Credential)
export const productModel: Repository<Products> = AppDataSource.getRepository(Products); // Asegúrate de exportar esto
export const carroModeloRepository: Repository<CarroModelo> = AppDataSource.getRepository(CarroModelo);




// //la de la nube 

// import { DataSource } from "typeorm";
// import { User } from "../entities/users";
// import { Credential } from "../entities/credentials";
// import { Products } from "../entities/Products";
// import { CarroModelo } from "../entities/ModelosDeCarros";
// import 'dotenv/config';


// export const AppDataSource = new DataSource({
//     type: "postgres",
//     url: process.env.DATABASE_URL, // Usa DATABASE_URL directamente
//     synchronize: false, // Cambia a `false` en producción
//     logging: false,
//     ssl: { rejectUnauthorized: false }, // Agrega esta configuración
//     entities: [User, Credential, Products, CarroModelo],
//     migrations: ["dist/migration/*.js"],
// });

// export const userModel = AppDataSource.getRepository(User);
// export const credentialModel = AppDataSource.getRepository(Credential);
// export const productModel = AppDataSource.getRepository(Products);
// export const carroModeloRepository = AppDataSource.getRepository(CarroModelo);
