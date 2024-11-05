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
exports.getLowStockProductsController = exports.checkStockController = exports.getLowStockProducts = exports.sellProductsController = exports.adjustStockController = exports.deleteProductController = exports.getProductByIdController = exports.updateProductController = exports.getProductsByCategoryController = exports.addProductController = exports.getAllProducts = void 0;
const productsService_1 = require("../services/productsService");
const checkLowStockMiddleware_1 = require("../middlewares/checkLowStockMiddleware");
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
        res.status(200).json({ message: 'Producto eliminado correctamente' });
        console.log('Se eliminó exitosamente el producto'); // Cambié console.error a console.log
    }
    catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto' }); // Manejo de errores
    }
});
exports.deleteProductController = deleteProductController;
const adjustStockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        if (quantity === undefined || quantity === 0) {
            return res.status(400).json({ message: "La cantidad debe ser un número diferente de cero" });
        }
        const updatedProduct = yield (0, productsService_1.adjustStockService)(parseInt(id), quantity);
        res.status(200).json({ message: "Stock ajustado correctamente", product: updatedProduct });
    }
    catch (error) {
        console.error("Error al ajustar el stock:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.adjustStockController = adjustStockController;
const sellProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = req.body; // Obtener la lista de artículos desde el cuerpo de la solicitud
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Se debe proporcionar un array de artículos para vender" });
        }
        const updatedProducts = yield (0, productsService_1.sellProductsService)(items);
        yield (0, checkLowStockMiddleware_1.checkLowStockMiddleware)(req, res, () => { }); // Llama al middleware para verificar el stock
        res.status(200).json({ message: "Ventas realizadas correctamente", products: updatedProducts });
    }
    catch (error) {
        console.error("Error al realizar la venta:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.sellProductsController = sellProductsController;
const getLowStockProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lowStockProducts = yield (0, productsService_1.checkLowStock)();
        if (lowStockProducts.length === 0) {
            return res.status(200).json({ message: "No hay productos con stock bajo" });
        }
        res.status(200).json({ message: "Productos con stock bajo", products: lowStockProducts });
    }
    catch (error) {
        console.error("Error al obtener productos con stock bajo:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.getLowStockProducts = getLowStockProducts;
const checkStockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productsService_1.notifyLowStock)();
        res.status(200).json({ message: "Verificación de stock realizada" });
    }
    catch (error) {
        console.error("Error al verificar stock:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.checkStockController = checkStockController;
// src/controllers/ProductsController.ts
const getLowStockProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lowStockProducts = yield (0, productsService_1.getLowStockProductsService)();
        res.status(200).json(lowStockProducts);
    }
    catch (error) {
        console.error("Error al obtener productos con stock bajo:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.getLowStockProductsController = getLowStockProductsController;
