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
exports.deleteProductController = exports.getProductByIdController = exports.updateProductController = exports.getProductsByCategoryController = exports.addProductController = exports.getAllProducts = void 0;
const productsService_1 = require("../services/productsService"); // Importa tu servicio de productos
// Controlador para obtener todos los productos
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Solicitud a /products recibida'); // Log de solicitud
        const products = yield (0, productsService_1.getProductsService)(); // Llama al servicio para obtener productos
        res.status(200).json(products); // Responde con los productos obtenidos
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' }); // Manejo de errores
    }
});
exports.getAllProducts = getAllProducts;
// Controlador para agregar un nuevo producto
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Cambia el tipo a AddProductDTO
        const productData = req.body; // Obtiene los datos del producto del cuerpo de la solicitud
        const newProduct = yield (0, productsService_1.addProductService)(productData); // Llama al servicio para agregar el producto
        res.status(201).json(newProduct); // Responde con el producto creado y un código de estado 201
    }
    catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto' }); // Manejo de errores
    }
});
exports.addProductController = addProductController;
// Controlador para obtener productos por categoría
const getProductsByCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoria } = req.query; // Obtener la categoría desde la consulta
        // Verificar si categoria es un string
        if (typeof categoria !== 'string') {
            return res.status(400).json({ message: 'La categoría debe ser una cadena de texto.' });
        }
        const products = yield (0, productsService_1.getProductsByCategoryService)(categoria); // Llamar al servicio
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos en esta categoría.' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).json({ message: 'Error al obtener productos por categoría' });
    }
});
exports.getProductsByCategoryController = getProductsByCategoryController;
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = yield (0, productsService_1.updateProductService)(Number(id), updatedData);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
});
exports.updateProductController = updateProductController;
const getProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, productsService_1.getProductByIdService)(Number(id));
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ message: 'Error al obtener producto por ID' });
    }
});
exports.getProductByIdController = getProductByIdController;
//borrar un producto 
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Obtener el ID del producto desde los parámetros de la solicitud
        yield (0, productsService_1.deleteProductService)(parseInt(id)); // Llama al servicio para eliminar el producto
        res.status(204).send(); // Responde con un código de estado 204 (No Content)
    }
    catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto' }); // Manejo de errores
    }
});
exports.deleteProductController = deleteProductController;
