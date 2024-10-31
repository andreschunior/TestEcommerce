import { Products } from "../entities/Products"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { AppDataSource, productModel } from "../config/data-source"; // Ajusta la ruta a tu archivo de configuración
import { CarroModelo } from "../entities/ModelosDeCarros";
import { In } from "typeorm";
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