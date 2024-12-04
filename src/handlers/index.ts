import { Request, Response } from 'express';
import User from '../models/Users';
import { checkPassword, hashPassword } from '../utils/auth';
import { validationResult } from 'express-validator';

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

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error en createAccount:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Simula lógica de autenticación
    const user = await User.findOne({ email });
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!user || isPasswordCorrect) {
      res
        .status(401)
        .json({ error: `Credenciales incorrectas: ${isPasswordCorrect}` });
      return;
    }
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
