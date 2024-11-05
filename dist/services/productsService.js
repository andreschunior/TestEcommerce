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
exports.getLowStockProductsService = exports.notifyLowStock = exports.checkLowStock = exports.sellProductsService = exports.adjustStockService = exports.deleteProductService = exports.getProductByIdService = exports.updateProductService = exports.getProductsByCategoryService = exports.addProductService = exports.getProductsService = void 0;
const Products_1 = require("../entities/Products"); // Asegúrate de ajustar la ruta según tu estructura de archivos
const data_source_1 = require("../config/data-source"); // Ajusta la ruta a tu archivo de configuración
const ModelosDeCarros_1 = require("../entities/ModelosDeCarros");
const typeorm_1 = require("typeorm");
// Obtiene el repositorio de productos desde la configuración de la base de datos
const getProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield data_source_1.productModel.find();
    return products;
});
exports.getProductsService = getProductsService;
// Servicio para agregar un nuevo producto
const addProductService = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    // Inicializa el DataSource si aún no lo has hecho en tu aplicación principal
    if (!data_source_1.AppDataSource.isInitialized) {
        yield data_source_1.AppDataSource.initialize();
    }
    // Obtener repositorios a través de AppDataSource
    const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    const modeloRepository = data_source_1.AppDataSource.getRepository(ModelosDeCarros_1.CarroModelo);
    // Buscar los modelos compatibles
    const modelosCompatibles = yield modeloRepository.findBy({ id: (0, typeorm_1.In)(productData.modelosCompatiblesIds) });
    // Crear una nueva instancia del producto
    const newProduct = productRepository.create({
        nombre: productData.nombre,
        descripcion: productData.descripcion,
        precio: productData.precio,
        stock: productData.stock,
        categoria: productData.categoria,
        imagenURL: productData.imagenURL,
        modeloCompatible: modelosCompatibles, // Asigna la relación de modelos compatibles
    });
    // Guardar el nuevo producto en la base de datos
    yield productRepository.save(newProduct); // Usa el método save() del repositorio
    return newProduct; // Retorna el producto guardado
});
exports.addProductService = addProductService;
const getProductsByCategoryService = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const query = data_source_1.productModel.createQueryBuilder("product")
        .leftJoinAndSelect("product.modeloCompatible", "modelo"); // Agrega la relación de modelos compatibles
    if (categoria) {
        query.where("product.categoria ILIKE :categoria", { categoria: `%${categoria}%` }); // Añade comodines para búsqueda más flexible
    }
    const products = yield query.getMany();
    return products;
});
exports.getProductsByCategoryService = getProductsByCategoryService;
const updateProductService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield data_source_1.productModel.findOneBy({ id });
    if (!product) {
        return null; // Producto no encontrado
    }
    // Actualiza solo los campos enviados en `updatedData`
    Object.assign(product, updatedData);
    yield data_source_1.productModel.save(product);
    return product;
});
exports.updateProductService = updateProductService;
const getProductByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield data_source_1.productModel.findOne({
        where: { id },
        relations: ["modeloCompatible"] // Incluye la relación si deseas obtener los modelos compatibles
    });
    return product;
});
exports.getProductByIdService = getProductByIdService;
//borrar un producto
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield data_source_1.productModel.findOneBy({ id });
    if (!product) {
        throw new Error('Producto no encontrado'); // Manejo de errores si el producto no existe
    }
    yield data_source_1.productModel.remove(product); // Eliminar el producto de la base de datos
});
exports.deleteProductService = deleteProductService;
// Servicio para ajustar el stock de un producto
const adjustStockService = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield data_source_1.productModel.findOne({ where: { id } });
    if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`);
    }
    // Validación para asegurarse de que el stock no quede en negativo
    const newStock = product.stock + quantity;
    if (newStock < 0) {
        throw new Error("La operación excede el stock disponible");
    }
    // Ajustar el stock (sumar o restar según el valor de quantity)
    product.stock = newStock;
    // Guardar el cambio en la base de datos
    yield data_source_1.productModel.save(product);
    return product;
});
exports.adjustStockService = adjustStockService;
const sellProductsService = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    const updatedProducts = [];
    for (const item of items) {
        const { productId, quantity } = item;
        // Buscar el producto por ID
        const product = yield productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new Error(`Producto con ID ${productId} no encontrado`);
        }
        // Verificar que haya suficiente stock
        if (product.stock < quantity) {
            throw new Error(`Stock insuficiente para el producto con ID ${productId}`);
        }
        // Restar la cantidad vendida del stock
        product.stock -= quantity;
        // Guardar los cambios en la base de datos
        yield productRepository.save(product);
        updatedProducts.push(product); // Agregar el producto actualizado a la lista
    }
    return updatedProducts;
});
exports.sellProductsService = sellProductsService;
// services/stockService.ts
const checkLowStock = () => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    const lowStockThreshold = 10; // Umbral de stock bajo
    return yield productRepository.find({
        where: {
            stock: (0, typeorm_1.LessThan)(lowStockThreshold)
        }
    });
});
exports.checkLowStock = checkLowStock;
// Servicio para notificar si hay stock bajo
const notifyLowStock = () => __awaiter(void 0, void 0, void 0, function* () {
    const lowStockProducts = yield (0, exports.checkLowStock)();
    if (lowStockProducts.length > 0) {
        console.log("Alerta: Stock bajo para los siguientes productos:", lowStockProducts);
        // Aquí puedes añadir lógica para enviar un mensaje al frontend
    }
});
exports.notifyLowStock = notifyLowStock;
// src/services/productsService.ts
const getLowStockProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    const lowStockThreshold = 5; // Umbral de stock bajo
    return yield productRepository.find({
        where: {
            stock: (0, typeorm_1.LessThan)(lowStockThreshold) // Utiliza LessThan de TypeORM
        }
    });
});
exports.getLowStockProductsService = getLowStockProductsService;
