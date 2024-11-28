import { Router } from 'express';
import User from './models/Users';

const router = Router();

/** Auth and Register */
router.post('/auth/register', (req, res) => {
  console.log(req.body);
  res.status(200).send({ mensaje: 'Datos recibidos correctamente' });
  //await User.create(req.body);
});

//
export default router;
