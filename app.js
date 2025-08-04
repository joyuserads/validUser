require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const PORT = process.env.PORT || 3000;

const app = express()


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


app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

});
