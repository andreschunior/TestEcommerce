"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AutosController_1 = require("../controllers/AutosController");
const autosRouter = (0, express_1.Router)();
autosRouter.get("/", AutosController_1.getAllModels);
autosRouter.post("/", AutosController_1.createCarroModelo);
exports.default = autosRouter;
