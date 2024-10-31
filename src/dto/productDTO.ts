export interface AddProductDTO {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria?: string;
    imagenURL?: string;
    modelosCompatiblesIds: number[]; // Esta propiedad es requerida
}