import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount } from './handlers';

const router = Router();

/** Auth and Register */
router.post(
  '/auth/register',
  body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
  body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
  body('email').isEmail().withMessage('El email no puede ir vacio'),
  body('password').isLength({ min: 8 }).withMessage('El password es muy corto'),
  createAccount
);

export default router;
