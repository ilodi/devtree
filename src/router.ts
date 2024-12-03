import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, login } from './handlers';

const router = Router();

/** Auth and Register */
router.post(
  '/auth/register',
  [
    body('handle')
      .notEmpty()
      .withMessage('El nombre de usuario (handle) no puede ir vacío'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
    body('email')
      .isEmail()
      .withMessage('El email debe ser válido y no puede ir vacío'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('El password debe tener al menos 8 caracteres'),
  ],
  createAccount
);

router.post(
  '/auth/login',
  [
    body('email')
      .isEmail()
      .withMessage('El email debe ser válido y no puede ir vacío'),
    body('password')
      .notEmpty()
      .withMessage('El password no puede ir vacío')
      .isLength({ min: 8 })
      .withMessage('El password debe tener al menos 8 caracteres'),
  ],
  login
);

export default router;
