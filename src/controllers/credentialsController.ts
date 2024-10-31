import { NextFunction, Request, Response } from "express"
import ICredentialDto from "../dto/credentialDto";

import { createNewCredentialsServices,loginCredentialServices,getCredentialsService } from "../services/CredentialService";

// export const saveCredentials = async (req: Request,res: Response) => {
//     const credentials = req.body;
//  const turns = await saveCredentialsServices(credentials)
//     res.status(201).json(turns);
// }

export const createNewCredentials = async (req: Request, res: Response) => {
    // Extraer los datos de las credenciales del cuerpo de la solicitud
    const credentialData: ICredentialDto = req.body;

    // Llamar a createNewCredentialsServices con los datos de las credenciales
    const newCredential = await createNewCredentialsServices(credentialData);

    // Enviar una respuesta con las nuevas credenciales
    res.status(201).json(newCredential);
}
//obtener las credenciales
export const getCredentials = async (req: Request, res: Response) => {
    // Llamar a getCredentialsService para obtener las credenciales
    const credentials = await getCredentialsService();

    // Enviar una respuesta con las credenciales
    res.status(200).json(credentials);
}

export const loginCredentials = async (req: Request, res: Response) => {
    // Extraer los datos de las credenciales del cuerpo de la solicitud
    const credentialData: ICredentialDto = req.body;

    // Llamar a loginCredentialServices con los datos de las credenciales
    const credentialId = await loginCredentialServices(credentialData);

    // Comprobar si se encontraron las credenciales
    if (credentialId === null) {
        // Si no se encontraron las credenciales, enviar una respuesta con un mensaje de error
        res.status(400).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    } else {
        // Si se encontraron las credenciales, enviar una respuesta con el ID de las credenciales
        res.status(200).json({ credentialId });
    }
}

