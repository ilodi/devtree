import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, login } from './handlers';
import { handleInputError } from './middleware/validation';

const router = Router();

/** Auth and Register */
router.post(
  '/auth/register',
  // reglas de validez
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
  // middleware
  handleInputError,
  // handlers
  createAccount
);

router.post(
  '/auth/login',
  // reglas de validez
  [
    body('email')
      .isEmail()
      .withMessage('El email debe ser válido y no puede ir vacío'),
    body('password')
      .notEmpty()
      .withMessage('El password no puede ir vacío')
      .notEmpty()
      .withMessage('El password es obligatorio'),
  ],
  // middleware
  handleInputError,
  // handlers
  login
);

export default router;
