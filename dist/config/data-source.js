"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carroModeloRepository = exports.productModel = exports.credentialModel = exports.userModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("../entities/users");
const credentials_1 = require("../entities/credentials");
const Products_1 = require("../entities/Products");
const ModelosDeCarros_1 = require("../entities/ModelosDeCarros");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Circuitos1",
    database: "ecommercetest",
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [users_1.User, credentials_1.Credential, Products_1.Products, ModelosDeCarros_1.CarroModelo],
    subscribers: [],
    migrations: [],
});
exports.userModel = exports.AppDataSource.getRepository(users_1.User);
exports.credentialModel = exports.AppDataSource.getRepository(credentials_1.Credential);
exports.productModel = exports.AppDataSource.getRepository(Products_1.Products); // Asegúrate de exportar esto
exports.carroModeloRepository = exports.AppDataSource.getRepository(ModelosDeCarros_1.CarroModelo);
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
