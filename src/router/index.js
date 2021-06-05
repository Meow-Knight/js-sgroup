const express = require('express');
const Article = require('../model/article');

const router = express.Router();

const articleRouter = require('./article/index');
const authRouter = require('./auth/index');

const { authRequired, authNotRequired } = require('../middleware/auth.middleware');

router.get('/', authRequired, async(req, res) => {
    const articles = await Article.find().sort('-createdAt');
    return res.render('pages/home.pug', {
        articles
    });
});

router.use('/articles', articleRouter);
router.use('/auth', authNotRequired, authRouter);

module.exports = router;