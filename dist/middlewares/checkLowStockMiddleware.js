"use strict";
// middlewares/checkLowStockMiddleware.ts
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
exports.checkLowStockMiddleware = void 0;
const productsService_1 = require("../services/productsService");
const checkLowStockMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lowStockProducts = yield (0, productsService_1.checkLowStock)();
        if (lowStockProducts.length > 0) {
            console.log("Alerta: Stock bajo para los siguientes productos:", lowStockProducts);
            // Aquí puedes agregar lógica para enviar una notificación o alerta
            // Por ejemplo, podrías guardar esto en un sistema de registro o enviarlo a un servicio de notificación
        }
        next(); // Llama al siguiente middleware o controlador
    }
    catch (error) {
        console.error("Error al verificar stock:", error);
        return res.status(500).json({ message: error.message });
    }
});
exports.checkLowStockMiddleware = checkLowStockMiddleware;
