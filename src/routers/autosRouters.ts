import { Router } from "express";
import { getModelosDeCarrosService } from "../services/CarrosService";
import { createCarroModelo, getAllModels } from "../controllers/AutosController";


const autosRouter: Router = Router();



autosRouter.get("/", getAllModels);
autosRouter.post("/", createCarroModelo);





export default autosRouter ;