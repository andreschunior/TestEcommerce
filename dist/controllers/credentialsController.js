"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCredentials = exports.getCredentials = exports.createNewCredentials = void 0;
const CredentialService_1 = require("../services/CredentialService");
// export const saveCredentials = async (req: Request,res: Response) => {
//     const credentials = req.body;
//  const turns = await saveCredentialsServices(credentials)
//     res.status(201).json(turns);
// }
const createNewCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraer los datos de las credenciales del cuerpo de la solicitud
    const credentialData = req.body;
    // Llamar a createNewCredentialsServices con los datos de las credenciales
    const newCredential = yield (0, CredentialService_1.createNewCredentialsServices)(credentialData);
    // Enviar una respuesta con las nuevas credenciales
    res.status(201).json(newCredential);
});
exports.createNewCredentials = createNewCredentials;
//obtener las credenciales
const getCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Llamar a getCredentialsService para obtener las credenciales
    const credentials = yield (0, CredentialService_1.getCredentialsService)();
    // Enviar una respuesta con las credenciales
    res.status(200).json(credentials);
});
exports.getCredentials = getCredentials;
const loginCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraer los datos de las credenciales del cuerpo de la solicitud
    const credentialData = req.body;
    // Llamar a loginCredentialServices con los datos de las credenciales
    const credentialId = yield (0, CredentialService_1.loginCredentialServices)(credentialData);
    // Comprobar si se encontraron las credenciales
    if (credentialId === null) {
        // Si no se encontraron las credenciales, enviar una respuesta con un mensaje de error
        res.status(400).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
    else {
        // Si se encontraron las credenciales, enviar una respuesta con el ID de las credenciales
        res.status(200).json({ credentialId });
    }
});
exports.loginCredentials = loginCredentials;
