require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bycript = require('bycript');

const jwt = require('jsonwebtoken');




const app = express()



app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  
});
