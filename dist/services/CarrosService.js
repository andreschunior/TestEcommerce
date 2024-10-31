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
exports.createCarroModeloService = exports.getModelosDeCarrosService = void 0;
const data_source_1 = require("../config/data-source"); // Ajusta la ruta a tu archivo de configuración
// Obtiene el repositorio de modelos de carros desde la configuración de la base de datos
const getModelosDeCarrosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const modelos = yield data_source_1.carroModeloRepository.find();
    return modelos;
});
exports.getModelosDeCarrosService = getModelosDeCarrosService;
// Servicio para agregar un nuevo modelo de carro
const createCarroModeloService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const carroModelo = data_source_1.carroModeloRepository.create(data); // Crea una nueva instancia del modelo
    return yield data_source_1.carroModeloRepository.save(carroModelo); // Guarda el modelo en la base de datos
});
exports.createCarroModeloService = createCarroModeloService;
