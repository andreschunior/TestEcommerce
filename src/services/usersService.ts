import { promises } from "dns";
import IUserDto from "../dto/userDto";
import ICredentialDto from "../dto/credentialDto";
import IUser from "../interfaces/IUser"

import { createNewCredentialsServices } from "./CredentialService";
import { AppDataSource, credentialModel, userModel } from "../config/data-source";
import { User } from "../entities/users";



let users:IUser[] = [];
// aumento el id en 1 con respecto al numero mas alto dentro de la base de datos local
// let id = usersDatabase.length > 0 ? Math.max(...usersDatabase.map(user => user.id || 0)) + 1 : 1;

export const createUsersService = async (userData : User, credentialData : ICredentialDto): Promise<User> => {
    // Primero, creamos las credenciales y obtenemos su ID
    const credentialId = await createNewCredentialsServices(credentialData);

    
    // Luego, buscamos la instancia de Credential
    const credential = await credentialModel.findOneOrFail({ where: { id: credentialId } });




    // Asignamos la instancia de Credential al usuario
    if (credential) {
        userData.credentialsid = credential;
    } else {
        // Maneja el caso en que credential es null
    }
    // Finalmente, creamos el usuario
    const newUser = await userModel.create(userData);
    const results = await userModel.save(newUser);

    return results;
}
  


// const newUser : IUser = {
//     id,
//     name : userData.name,
//     email : userData.email,
//     birthdate: userData.birthdate,
//     active: userData.active,
//     nDni: userData.nDni,
//     credentialsId: credentialsId
// }
// usersDatabase.push(newUser);
// return newUser;

export const getUserByIdService = async (id: number) : Promise<User | null> => {
    // Usa createQueryBuilder para cargar los turnos
    const user = await userModel.createQueryBuilder("user")
        .leftJoinAndSelect("user.turns", "turn")
        .where("user.id = :id", { id })
        .getOne();

    return user;
}


export const getUsersService = async () : Promise<User[]>  => {
    // return usersDatabase ;
    //el userModel es una variable que guarda el objeto ppDataSource.getRepository(User)
    const users = await userModel.find();
    
    return users ;

}
export const deleteUsersService = async (id: number)  => {
    const results = await userModel.delete({ id: id })
    return results ;
}