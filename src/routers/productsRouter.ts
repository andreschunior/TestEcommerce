import { Router } from "express";
import { addProductController, adjustStockController, deleteProductController, getAllProducts, getLowStockProducts, getLowStockProductsController, getProductByIdController, getProductsByCategoryController,sellProductsController,updateProductController } from "../controllers/ProductsController";


const productsRouter: Router = Router();



productsRouter.get("/", getAllProducts);
productsRouter.post("/", addProductController); // Ruta para agregar un nuevo producto
productsRouter.get("/category", getProductsByCategoryController); // Nueva ruta para filtrar productos
productsRouter.put("/:id", updateProductController);
productsRouter.get("/:id", getProductByIdController);
productsRouter.delete("/:id", deleteProductController); // Ruta para eliminar un producto
productsRouter.patch("/:id/adjust-stock", adjustStockController);
productsRouter.post("/sales", sellProductsController)






export default productsRouter ;