import ICredentialDto from "../dto/credentialDto";
import ICredential from "../interfaces/ICredential";
import { credentialModel } from "../config/data-source";
import { Credential } from "../entities/credentials";


//Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos.
// Debe retornar el ID del par de credenciales creado.
// let idCounter = credentialDatabase.length > 0 ? Math.max(...credentialDatabase.map(credential => credential.id || 0)) + 1 : 1;

// export const saveCredentialsServices = (credentials: ICredential) => {
//     credentials.id =  idCounter++;
//     credentialDatabase.push(credentials);
//     return credentials.id;
// }

export const createNewCredentialsServices = async (credentialData : ICredentialDto): Promise<number> => {
    const newCredential = await credentialModel.create(credentialData)
    await credentialModel.save(newCredential)

    return newCredential.id 
    
    // ICredential = {
    
        //     id: 0,
    //     username: credentialData.username,
    //     password:credentialData.password ,
    // }
    // newCredential.id = saveCredentialsServices(newCredential);
    // return newCredential;
}

export const getCredentials = async (req: Request, res: Response) => {
    // Llamar a getCredentialsService para obtener las credenciales
    const credentials = await getCredentialsService();
}

export const getCredentialsService = async () : Promise<Credential[]>  => {
    // return usersDatabase ;
    //el userModel es una variable que guarda el objeto ppDataSource.getRepository(User)
    const credentials = await credentialModel.find();
    
    return credentials ;
}




export const loginCredentialServices = async (credentialData : ICredentialDto): Promise<number | null> => {
    // Busca en la base de datos las credenciales que coincidan con el username proporcionado
    const foundCredential = await credentialModel.findOne({ where: { username: credentialData.username } });

    // Si no se encontraron las credenciales, retorna null
    if (!foundCredential) {
        return null;
    }

    // Comprueba si la password proporcionada coincide con la almacenada en la base de datos
    if (foundCredential.password === credentialData.password) {
        // Si la password es correcta, retorna el id de las credenciales
        return foundCredential.id;
    } else {
        // Si la password es incorrecta, retorna null
        return null;
    }
}
    // //verificacion de login 
    // export const loginCredentialServices = async (credentialData : ICredentialDto): Promise<number | null> => {
    //     // Busca en la base de datos las credenciales que coincidan con el username proporcionado
    //     const foundCredential = credentialDatabase.find(credential => credential.username === credentialData.username);
    
    //     // Si no se encontraron las credenciales, retorna null
    //     if (!foundCredential) {
    //         return null;
    //     }
    
    //     // Comprueba si la password proporcionada coincide con la almacenada en la base de datos
    //     if (foundCredential.password === credentialData.password) {
    //         // Si la password es correcta, retorna las credenciales
    //         return foundCredential.id;
    //     } else {
    //         // Si la password es incorrecta, retorna null
    //         return null;
    //     }
    // }
    



