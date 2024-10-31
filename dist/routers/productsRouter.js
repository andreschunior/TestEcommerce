"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = require("../controllers/ProductsController");
const productsRouter = (0, express_1.Router)();
productsRouter.get("/", ProductsController_1.getAllProducts);
productsRouter.post("/", ProductsController_1.addProductController); // Ruta para agregar un nuevo producto
productsRouter.get("/category", ProductsController_1.getProductsByCategoryController); // Nueva ruta para filtrar productos
productsRouter.put("/:id", ProductsController_1.updateProductController);
productsRouter.get("/:id", ProductsController_1.getProductByIdController);
productsRouter.delete('/products/:id', ProductsController_1.deleteProductController); // Ruta para eliminar un producto
exports.default = productsRouter;
