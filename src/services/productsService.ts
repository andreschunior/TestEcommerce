import { Products } from "../entities/Products"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { AppDataSource, productModel } from "../config/data-source"; // Ajusta la ruta a tu archivo de configuración
import { CarroModelo } from "../entities/ModelosDeCarros";
import { In, LessThan } from "typeorm";
import { AddProductDTO } from "../dto/productDTO";

// Obtiene el repositorio de productos desde la configuración de la base de datos
export const getProductsService = async (): Promise<Products[]> => {
    const products = await productModel.find();
    return products;
};




// Servicio para agregar un nuevo producto
export const addProductService = async (productData: AddProductDTO): Promise<Products> => {
    // Inicializa el DataSource si aún no lo has hecho en tu aplicación principal
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    // Obtener repositorios a través de AppDataSource
    const productRepository = AppDataSource.getRepository(Products);
    const modeloRepository = AppDataSource.getRepository(CarroModelo);

    // Buscar los modelos compatibles
    const modelosCompatibles = await modeloRepository.findBy({ id: In(productData.modelosCompatiblesIds) });

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
    await productRepository.save(newProduct); // Usa el método save() del repositorio

    return newProduct; // Retorna el producto guardado
};



export const getProductsByCategoryService = async (categoria: string): Promise<Products[]> => {
    const query = productModel.createQueryBuilder("product")
        .leftJoinAndSelect("product.modeloCompatible", "modelo"); // Agrega la relación de modelos compatibles

    if (categoria) {
        query.where("product.categoria ILIKE :categoria", { categoria: `%${categoria}%` }); // Añade comodines para búsqueda más flexible
    }

    const products = await query.getMany();
    return products;
};


export const updateProductService = async (id: number, updatedData: Partial<Products>): Promise<Products | null> => {
    const product = await productModel.findOneBy({ id });
    
    if (!product) {
        return null; // Producto no encontrado
    }

    // Actualiza solo los campos enviados en `updatedData`
    Object.assign(product, updatedData);

    await productModel.save(product);
    return product;
};

export const getProductByIdService = async (id: number): Promise<Products | null> => {
    const product = await productModel.findOne({
        where: { id },
        relations: ["modeloCompatible"] // Incluye la relación si deseas obtener los modelos compatibles
    });
    return product;
};

//borrar un producto
export const deleteProductService = async (id: number): Promise<void> => {
    const product = await productModel.findOneBy({ id });

    if (!product) {
        throw new Error('Producto no encontrado'); // Manejo de errores si el producto no existe
    }

    await productModel.remove(product); // Eliminar el producto de la base de datos
};

// Servicio para ajustar el stock de un producto
export const adjustStockService = async (id: number, quantity: number): Promise<Products> => {
    const product = await productModel.findOne({ where: { id } });

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
    await productModel.save(product);

    return product;
};

interface SaleItem {
    productId: number;
    quantity: number;
}

export const sellProductsService = async (items: SaleItem[]): Promise<Products[]> => {
    const productRepository = AppDataSource.getRepository(Products);
    const updatedProducts: Products[] = [];

    for (const item of items) {
        const { productId, quantity } = item;

        // Buscar el producto por ID
        const product = await productRepository.findOne({ where: { id: productId } });
        
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
        await productRepository.save(product);
        updatedProducts.push(product); // Agregar el producto actualizado a la lista
    }

    return updatedProducts;
};




// services/stockService.ts


export const checkLowStock = async (): Promise<Products[]> => {
    const productRepository = AppDataSource.getRepository(Products);
    const lowStockThreshold = 10; // Umbral de stock bajo

    return await productRepository.find({
        where: {
            stock: LessThan(lowStockThreshold)
        }
    });
};

// Servicio para notificar si hay stock bajo
export const notifyLowStock = async () => {
    const lowStockProducts = await checkLowStock();
    if (lowStockProducts.length > 0) {
        console.log("Alerta: Stock bajo para los siguientes productos:", lowStockProducts);
        // Aquí puedes añadir lógica para enviar un mensaje al frontend
    }
};

// src/services/productsService.ts
export const getLowStockProductsService = async (): Promise<Products[]> => {
    const productRepository = AppDataSource.getRepository(Products);
    const lowStockThreshold = 5; // Umbral de stock bajo
    return await productRepository.find({
        where: {
            stock: LessThan(lowStockThreshold) // Utiliza LessThan de TypeORM
        }
    });
};



