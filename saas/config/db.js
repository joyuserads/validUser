require("dotenv").config();
const mongoose = require('mongoose');


module.exports = class bd {
    constructor() {
       this.status = 0;
       this.connect();
    }
    async connect() {
        const config = {
            server: process.env.MONGO_URI,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            options: {
                encrypt:false,
                trustServerCertificate: true,
            }
        };

       await mongoose
       .connect(config)
       .then(() => {
           console.log('Banco de dados conectado com sucesso');
           this.status = 1;
       })
       .catch((error) => {
           console.error('Erro ao conectar ao banco de dados:', error);
           this.status = 0;
       });
    }
};