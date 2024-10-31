"use strict";
// const num1:number =  5;
// const num2:number = 10 ;
// const num3:number = 15 ;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const suma:number = num1 + num2 + num3 ;
// console.log(suma);
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const PORT = 3000;
data_source_1.AppDataSource.initialize()
    .then(res => {
    console.log("conexion exitosa a la base de datos");
    server_1.default.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
})
    .catch(err => {
    console.error("Hubo un error al inicializar la base de datos: ", err);
});
