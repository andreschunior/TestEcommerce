import { Request, Response, NextFunction } from 'express';
import { userModel } from '../config/data-source';
import { credentialModel } from '../config/data-source';

export const checkDuplicateFields = async (req: Request, res: Response, next: NextFunction) => {
    const { birthdate, nDni, email, username } = req.body;
  
    const user = await userModel.findOne({
        where: [
          { birthdate: birthdate },
          { nDni: nDni },
          { email: email },
        ]
      });
  
      const credential = await credentialModel.findOne({
        where: [{ username }],
      });
    
      if (user || credential) {
        return res.status(400).json({ message: 'Los valores de fecha de nacimiento, DNI, correo electrónico o nombre de usuario ya existen.' });
      }
    next();
};