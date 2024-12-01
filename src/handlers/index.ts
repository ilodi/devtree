import { Request, Response } from 'express';
import slug from 'slug';
import User from '../models/Users';
import { hashPassword } from '../utils/auth';

export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, handle } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409).json({ error: 'El usuario ya está registrado' });
      return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = slug(handle, '_');

    await user.save();
    //finalizar registro
    res.status(201).send({ mensaje: 'Datos recibidos correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error del Servidor' });
  }
};
