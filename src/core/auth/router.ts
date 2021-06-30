import express from 'express';
import { validate } from './validator/login.validator';
import { AuthController } from './controller';

const router = express.Router();

router.get('/login', (req, res) => res.render('pages/login.pug'));

router.post('/login', validate, AuthController.login);

router.get('/logout', AuthController.logout);

router.get('/register', (req, res) => res.render('pages/register.pug'));

router.post('/register', AuthController.register);

export default router;
