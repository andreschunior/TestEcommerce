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
exports.loginCredentialServices = exports.getCredentialsService = exports.getCredentials = exports.createNewCredentialsServices = void 0;
const data_source_1 = require("../config/data-source");
//Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos.
// Debe retornar el ID del par de credenciales creado.
// let idCounter = credentialDatabase.length > 0 ? Math.max(...credentialDatabase.map(credential => credential.id || 0)) + 1 : 1;
// export const saveCredentialsServices = (credentials: ICredential) => {
//     credentials.id =  idCounter++;
//     credentialDatabase.push(credentials);
//     return credentials.id;
// }
const createNewCredentialsServices = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = yield data_source_1.credentialModel.create(credentialData);
    yield data_source_1.credentialModel.save(newCredential);
    return newCredential.id;
    // ICredential = {
    //     id: 0,
    //     username: credentialData.username,
    //     password:credentialData.password ,
    // }
    // newCredential.id = saveCredentialsServices(newCredential);
    // return newCredential;
});
exports.createNewCredentialsServices = createNewCredentialsServices;
const getCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Llamar a getCredentialsService para obtener las credenciales
    const credentials = yield (0, exports.getCredentialsService)();
});
exports.getCredentials = getCredentials;
const getCredentialsService = () => __awaiter(void 0, void 0, void 0, function* () {
    // return usersDatabase ;
    //el userModel es una variable que guarda el objeto ppDataSource.getRepository(User)
    const credentials = yield data_source_1.credentialModel.find();
    return credentials;
});
exports.getCredentialsService = getCredentialsService;
const loginCredentialServices = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    // Busca en la base de datos las credenciales que coincidan con el username proporcionado
    const foundCredential = yield data_source_1.credentialModel.findOne({ where: { username: credentialData.username } });
    // Si no se encontraron las credenciales, retorna null
    if (!foundCredential) {
        return null;
    }
    // Comprueba si la password proporcionada coincide con la almacenada en la base de datos
    if (foundCredential.password === credentialData.password) {
        // Si la password es correcta, retorna el id de las credenciales
        return foundCredential.id;
    }
    else {
        // Si la password es incorrecta, retorna null
        return null;
    }
});
exports.loginCredentialServices = loginCredentialServices;
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
