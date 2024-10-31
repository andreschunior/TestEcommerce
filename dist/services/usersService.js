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
exports.deleteUsersService = exports.getUsersService = exports.getUserByIdService = exports.createUsersService = void 0;
const CredentialService_1 = require("./CredentialService");
const data_source_1 = require("../config/data-source");
let users = [];
// aumento el id en 1 con respecto al numero mas alto dentro de la base de datos local
// let id = usersDatabase.length > 0 ? Math.max(...usersDatabase.map(user => user.id || 0)) + 1 : 1;
const createUsersService = (userData, credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    // Primero, creamos las credenciales y obtenemos su ID
    const credentialId = yield (0, CredentialService_1.createNewCredentialsServices)(credentialData);
    // Luego, buscamos la instancia de Credential
    const credential = yield data_source_1.credentialModel.findOneOrFail({ where: { id: credentialId } });
    // Asignamos la instancia de Credential al usuario
    if (credential) {
        userData.credentialsid = credential;
    }
    else {
        // Maneja el caso en que credential es null
    }
    // Finalmente, creamos el usuario
    const newUser = yield data_source_1.userModel.create(userData);
    const results = yield data_source_1.userModel.save(newUser);
    return results;
});
exports.createUsersService = createUsersService;
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
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Usa createQueryBuilder para cargar los turnos
    const user = yield data_source_1.userModel.createQueryBuilder("user")
        .leftJoinAndSelect("user.turns", "turn")
        .where("user.id = :id", { id })
        .getOne();
    return user;
});
exports.getUserByIdService = getUserByIdService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    // return usersDatabase ;
    //el userModel es una variable que guarda el objeto ppDataSource.getRepository(User)
    const users = yield data_source_1.userModel.find();
    return users;
});
exports.getUsersService = getUsersService;
const deleteUsersService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield data_source_1.userModel.delete({ id: id });
    return results;
});
exports.deleteUsersService = deleteUsersService;
