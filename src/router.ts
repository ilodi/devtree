import { Router } from 'express';
import { createAccount } from './handlers';

const router = Router();

/** Auth and Register */
router.post('/auth/register', async (req, res) => {
  console.log('Body recibido:', req.body);
  res.status(200).send({ mensaje: 'Datos recibidos correctamente' });
  await User.create(req.body);
});

export default router;
