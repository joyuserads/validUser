const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  imagem: {
    type: String,
    required: true
  }
});
const Produto = mongoose.model('Produto', userSchema);

module.exports = Produto;