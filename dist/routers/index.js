"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialsController_1 = require("../controllers/credentialsController");
const productsRouter_1 = __importDefault(require("./productsRouter"));
const autosRouters_1 = __importDefault(require("./autosRouters"));
const ProductsController_1 = require("../controllers/ProductsController");
const router = (0, express_1.Router)();
router.use("/products", productsRouter_1.default);
router.use("/autos", autosRouters_1.default);
productsRouter_1.default.get("stock", ProductsController_1.getLowStockProductsController);
//ruta de prueba para acceder a las credenciales, conocer cuales son y utilizarlas para la prueba del login
router.get("/credentials", credentialsController_1.getCredentials);
exports.default = router;
