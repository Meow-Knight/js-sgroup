import express from 'express';
import Article from '../model/article';

const router = express.Router();

import articleRouter from '../core/article/index';
import authRouter from './auth/router';

import { authRequired, authNotRequired } from '../middleware/auth.middleware';

router.get('/', authRequired, async(req, res) => {
    const articles = await Article.find().sort('-createdAt');
    
    return res.render('pages/home.pug', {
        articles
    });
});

router.use('/articles', articleRouter);
router.use('/auth', authNotRequired, authRouter);

export default router;