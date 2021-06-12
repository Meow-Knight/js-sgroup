import express from 'express';
import { validate } from './validator/login.validator';
import { AuthController } from './controller';


const router = express.Router();

router.get('/login', (req, res) => {
    return res.render("pages/login.pug");
})

router.post('/login', validate, AuthController.login);

router.get('/logout', AuthController.logout);

export default router;