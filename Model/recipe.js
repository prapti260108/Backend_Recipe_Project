const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    steps: {
        type: String,
    },
    ingredients:{
        type : String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const RecipeModel = mongoose.model('Recipe', RecipeSchema);

module.exports = RecipeModel;
