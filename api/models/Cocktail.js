const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    },
    ingredients: [
        {
            ingredient: { type: String, required: true },
            amount: { type: String, required: true },
        }
    ],
    rates: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            rate: { type: Number, required: true },
        }
    ],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
module.exports = Cocktail;
