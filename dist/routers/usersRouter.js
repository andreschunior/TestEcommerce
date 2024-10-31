"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const router = (0, express_1.Router)();
router.get("/", UsersController_1.getAllProducts);
exports.default = router;
