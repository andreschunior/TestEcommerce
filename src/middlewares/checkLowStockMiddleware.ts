// middlewares/checkLowStockMiddleware.ts

import { NextFunction, Request, Response } from 'express';
import { checkLowStock } from '../services/productsService';


export const checkLowStockMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lowStockProducts = await checkLowStock();
        if (lowStockProducts.length > 0) {
            console.log("Alerta: Stock bajo para los siguientes productos:", lowStockProducts);
            // Aquí puedes agregar lógica para enviar una notificación o alerta
            // Por ejemplo, podrías guardar esto en un sistema de registro o enviarlo a un servicio de notificación
        }
        next(); // Llama al siguiente middleware o controlador
    } catch (error) {
        console.error("Error al verificar stock:", error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
