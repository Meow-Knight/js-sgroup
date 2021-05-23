const express = require('express');
const {join} = require('path');

const database = require('./config/database');
const Article = require('./model/article');
const {PORT} = require('./env');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')


const PUBLIC_PATH = join(__dirname, 'public');

const app = express();

database();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 1000
}));

app.get('/', async (req, res) => {
    const articles = await Article.find();
    return res.render('pages/home.pug', {
        articles
    });
})

app.get('/article/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    try {
        return res.render('pages/pageWithId.pug', {article});
    } catch (error) {
        return res.render('pages/error.pug');
    }
});

app.get('/articles/new', (req, res, next) => {
    return res.render('pages/newArticle.pug');
})


app.post('/articles', async (req, res) => {
    let createSuccess = true;
    const articleExisted = await Article.findOne({title: req.body.title}).exec();

    if (articleExisted) {
        return res.render('pages/error.pug');
    }

    try {
        await Article.create(req.body);
    } catch (error) {
        console.log(error);
        createSuccess = false
    }

    return createSuccess ? res.redirect('/') : res.render('pages/error.pug');
})

app.put('/article/edit/:id', async(req, res) => {
    let createSuccess = true;
    Article.findByIdAndUpdate(req.params.id.trim(), req.body, function (err, place) {
        if (err){
            console.log("bug in put method when edit article with id: " + req.params.id.trim());
            createSuccess = false;
        }
    })

    return createSuccess ? res.redirect('/') : res.render('pages/error.pug');
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});