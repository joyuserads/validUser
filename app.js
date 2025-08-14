require('dotenv').config({ path: '.env.local' });

const express = require('express');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const user = require('./saas/controllers/userController.js');

const cart = require('./saas/routers/cart.js');
const produto = require('./saas/controllers/produtoController.js');
const users = require('./saas/routers/userRoutes.js');
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('Banco de dados conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};


connectDB();

app.use('/users', user);
app.use('/usuarios', users);
app.use('/cart', cart);
app.use('/produto', produto);

app.get('/', (req, res) => {
  res.send('API está funcionando');
});

// Configura CORS para aceitar requisições do frontend
app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

});
