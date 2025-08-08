const mongoose = require('mongoose');
const Produto = require('./produto');

const cartSchema = new mongoose.Schema({
    idProduto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required: true
    },

    quant: {
        type: Number,
        required: true
    }
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;