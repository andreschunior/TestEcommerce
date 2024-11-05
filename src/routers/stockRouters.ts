import { Router } from "express";
import { getModelosDeCarrosService } from "../services/CarrosService";
import { createCarroModelo, getAllModels } from "../controllers/AutosController";
import { getLowStockProductsController } from "../controllers/ProductsController";


const stockRouters: Router = Router();



stockRouters.get("/", getLowStockProductsController);






export default stockRouters ;