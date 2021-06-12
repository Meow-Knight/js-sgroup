import express from 'express';
import Article from '../model/article';

const router = express.Router();

import articleRouter from './article/index';
import authRouter from './auth/index';

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