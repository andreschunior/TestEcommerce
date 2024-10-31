
import { Router } from "express";

import auth from "../middlewares/auth";
import produdcsRouter from "./productsRouter"
import { getCredentials } from "../controllers/credentialsController";
import productsRouter from "./productsRouter";
import autosRouters from "./autosRouters";

const router: Router = Router();


router.use("/products",productsRouter);
router.use("/autos",autosRouters);


//ruta de prueba para acceder a las credenciales, conocer cuales son y utilizarlas para la prueba del login
router.get("/credentials", getCredentials );





export default router;