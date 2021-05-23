const {model} = require('mongoose');

const ArticleModel = model('articles', {
    title: String,
    content: String,
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = ArticleModel;