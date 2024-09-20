const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const ArticleModel = mongoose.model('Article', articleSchema);

module.exports = ArticleModel;
