import { Request, Response } from 'express';
import User from '../models/Users';
import { hashPassword } from '../utils/auth';

export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Cargar dinámicamente el módulo slug
    const { default: slug } = await import('slug');

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409).json({ error: 'El usuario ya está registrado' });
      return;
    }

    const handle = slug(req.body.handle, '_');

    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      res
        .status(409)
        .json({ error: 'El nombre de usuario no está disponible' });
      return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();
    res.status(201).send({ mensaje: 'Datos recibidos correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error del Servidor' });
  }
};
