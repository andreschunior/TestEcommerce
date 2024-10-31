// const num1:number =  5;
// const num2:number = 10 ;
// const num3:number = 15 ;

// const suma:number = num1 + num2 + num3 ;

// console.log(suma);


import server from "./server"; 

import "reflect-metadata" 
import { AppDataSource } from "./config/data-source";
import { log } from "console";

const PORT = 3000

AppDataSource.initialize()
.then( res => {
    console.log("conexion exitosa a la base de datos"); 
    server.listen(PORT,()=> {
        console.log(`server listening on port ${PORT}`);    
    })
})

.catch(err => {
    console.error("Hubo un error al inicializar la base de datos: ", err);
});




