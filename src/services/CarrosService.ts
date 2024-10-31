import { CarroModelo } from "../entities/ModelosDeCarros"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { AppDataSource, carroModeloRepository } from "../config/data-source"; // Ajusta la ruta a tu archivo de configuración
import { Repository } from "typeorm";

// Obtiene el repositorio de modelos de carros desde la configuración de la base de datos


export const getModelosDeCarrosService = async (): Promise<CarroModelo[]> => {
    const modelos = await carroModeloRepository.find();
    return modelos;
};

// Servicio para agregar un nuevo modelo de carro
export const createCarroModeloService = async (data: Partial<CarroModelo>): Promise<CarroModelo> => {
    const carroModelo = carroModeloRepository.create(data); // Crea una nueva instancia del modelo
    return await carroModeloRepository.save(carroModelo); // Guarda el modelo en la base de datos
};