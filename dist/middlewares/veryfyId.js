"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware para verificar el userId
const verifyUserId = (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "El campo userId es requerido." });
    }
    next();
};
exports.default = verifyUserId;
// Usar el middleware en la rut
