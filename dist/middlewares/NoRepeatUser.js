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
exports.checkDuplicateFields = void 0;
const data_source_1 = require("../config/data-source");
const data_source_2 = require("../config/data-source");
const checkDuplicateFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { birthdate, nDni, email, username } = req.body;
    const user = yield data_source_1.userModel.findOne({
        where: [
            { birthdate: birthdate },
            { nDni: nDni },
            { email: email },
        ]
    });
    const credential = yield data_source_2.credentialModel.findOne({
        where: [{ username }],
    });
    if (user || credential) {
        return res.status(400).json({ message: 'Los valores de fecha de nacimiento, DNI, correo electrónico o nombre de usuario ya existen.' });
    }
    next();
});
exports.checkDuplicateFields = checkDuplicateFields;
