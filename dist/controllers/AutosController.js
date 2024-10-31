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
exports.createCarroModelo = exports.getAllModels = void 0;
const CarrosService_1 = require("../services/CarrosService");
// Controlador para obtener todos los productos
const getAllModels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Solicitud a /modelos recibida'); // Log de solicitud
        const products = yield (0, CarrosService_1.getModelosDeCarrosService)(); // Llama al servicio para obtener productos
        res.status(200).json(products); // Responde con los productos obtenidos
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' }); // Manejo de errores
    }
});
exports.getAllModels = getAllModels;
const createCarroModelo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body; // Obtiene los datos del cuerpo de la solicitud
        const nuevoCarroModelo = yield (0, CarrosService_1.createCarroModeloService)(data); // Llama al servicio
        res.status(201).json(nuevoCarroModelo); // Responde con el nuevo modelo creado
    }
    catch (error) {
        console.error('Error al crear el modelo de carro:', error);
        res.status(500).json({ message: 'Error al crear el modelo de carro' }); // Manejo de errores
    }
});
exports.createCarroModelo = createCarroModelo;
