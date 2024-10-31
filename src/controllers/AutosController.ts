import { Request, Response } from "express";

import { createCarroModeloService, getModelosDeCarrosService } from "../services/CarrosService";


// Controlador para obtener todos los productos
export const getAllModels = async (req: Request, res: Response) => {
    try {
        console.log('Solicitud a /modelos recibida'); // Log de solicitud

        const products = await getModelosDeCarrosService(); // Llama al servicio para obtener productos
        
        res.status(200).json(products); // Responde con los productos obtenidos
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' }); // Manejo de errores
    }
};

export const createCarroModelo = async (req: Request, res: Response) => {
    try {
        const data = req.body; // Obtiene los datos del cuerpo de la solicitud
        const nuevoCarroModelo = await createCarroModeloService(data); // Llama al servicio
        res.status(201).json(nuevoCarroModelo); // Responde con el nuevo modelo creado
    } catch (error) {
        console.error('Error al crear el modelo de carro:', error);
        res.status(500).json({ message: 'Error al crear el modelo de carro' }); // Manejo de errores
    }
};
