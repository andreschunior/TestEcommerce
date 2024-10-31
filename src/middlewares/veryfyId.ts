import { NextFunction, Request, Response } from "express";


// Middleware para verificar el userId

const  verifyUserId = (req : Request,res : Response,next : NextFunction ) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "El campo userId es requerido." });
    }
    next();
};

export default verifyUserId;

// Usar el middleware en la rut