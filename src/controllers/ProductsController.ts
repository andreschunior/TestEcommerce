import { Request, Response } from "express";

import { addProductService, adjustStockService,checkLowStock,deleteProductService, getLowStockProductsService, getProductByIdService, getProductsByCategoryService, getProductsService, notifyLowStock, sellProductsService, updateProductService,  } from "../services/productsService"; 
import { Products } from "../entities/Products";
import { AddProductDTO } from "../dto/productDTO";
import { checkLowStockMiddleware } from "../middlewares/checkLowStockMiddleware";


// Controlador para obtener todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log('Solicitud a /products recibida'); // Log de solicitud

        const products = await getProductsService(); // Llama al servicio para obtener productos
        
        res.status(200).json(products); // Responde con los productos obtenidos
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' }); // Manejo de errores
    }
};

// Controlador para agregar un nuevo producto
export const addProductController = async (req: Request, res: Response) => {
    try {
        // Cambia el tipo a AddProductDTO
        const productData: AddProductDTO = req.body; // Obtiene los datos del producto del cuerpo de la solicitud
        const newProduct = await addProductService(productData); // Llama al servicio para agregar el producto

        res.status(201).json(newProduct); // Responde con el producto creado y un código de estado 201
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto' }); // Manejo de errores
    }
};
// Controlador para obtener productos por categoría
export const getProductsByCategoryController = async (req: Request, res: Response) => {
    try {
        const { categoria } = req.query; // Obtener la categoría desde la consulta

        // Verificar si categoria es un string
        if (typeof categoria !== 'string') {
            return res.status(400).json({ message: 'La categoría debe ser una cadena de texto.' });
        }

        const products = await getProductsByCategoryService(categoria); // Llamar al servicio

        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos en esta categoría.' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).json({ message: 'Error al obtener productos por categoría' });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedProduct = await updateProductService(Number(id), updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
};

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await getProductByIdService(Number(id));

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ message: 'Error al obtener producto por ID' });
    }
};

//borrar un producto 

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Obtener el ID del producto desde los parámetros de la solicitud
        await deleteProductService(parseInt(id)); // Llama al servicio para eliminar el producto
        res.status(200).json({ message: 'Producto eliminado correctamente' });
        console.log('Se eliminó exitosamente el producto'); // Cambié console.error a console.log
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto' }); // Manejo de errores
    }
};


export const adjustStockController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined || quantity === 0) {
            return res.status(400).json({ message: "La cantidad debe ser un número diferente de cero" });
        }

        const updatedProduct = await adjustStockService(parseInt(id), quantity);
        res.status(200).json({ message: "Stock ajustado correctamente", product: updatedProduct });
    } catch (error) {
        console.error("Error al ajustar el stock:", (error as Error).message);
        res.status(500).json({ message: (error as Error).message });
    }
};

export const sellProductsController = async (req: Request, res: Response) => {
    try {
        const items = req.body; // Obtener la lista de artículos desde el cuerpo de la solicitud

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Se debe proporcionar un array de artículos para vender" });
        }

        const updatedProducts = await sellProductsService(items);
        await checkLowStockMiddleware(req, res, () => {}); // Llama al middleware para verificar el stock

        res.status(200).json({ message: "Ventas realizadas correctamente", products: updatedProducts });
    } catch (error) {
        console.error("Error al realizar la venta:", error);
        res.status(500).json({ message: (error as Error).message });
    }
};



export const getLowStockProducts = async (req: Request, res: Response) => {
    try {
        const lowStockProducts = await checkLowStock();

        if (lowStockProducts.length === 0) {
            return res.status(200).json({ message: "No hay productos con stock bajo" });
        }

        res.status(200).json({ message: "Productos con stock bajo", products: lowStockProducts });
    } catch (error) {
        console.error("Error al obtener productos con stock bajo:", error);
        res.status(500).json({ message: (error as Error).message });
    }
};

export const checkStockController = async (req: Request, res: Response) => {
    try {
        await notifyLowStock();
        res.status(200).json({ message: "Verificación de stock realizada" });
    } catch (error) {
        console.error("Error al verificar stock:", error);
        res.status(500).json({ message: (error as Error).message });
    }
};

// src/controllers/ProductsController.ts
export const getLowStockProductsController = async (req: Request, res: Response) => {
    try {
        const lowStockProducts = await getLowStockProductsService();
        res.status(200).json(lowStockProducts);
    } catch (error) {
        console.error("Error al obtener productos con stock bajo:", error);
        res.status(500).json({ message: (error as Error).message });
    }
};


