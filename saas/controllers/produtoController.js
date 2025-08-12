const express = require('express');
const Produto = require('../middlewares/schema/produto');

const api = express.Router();   


api.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
})

api.get('/produtos/:id', async (req, res) => {

    const { id } = req.params;
    
    try{
        const produto = await Produtos.findById(id);
        if(!produto){
            res.status(404).json({ message: 'Produto não encontrado!!'})
        }

        res.status(200).json(produto, { message: 'Produto encontrado com sucesso!' });
    }catch (error){
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
})



api.post('/produtos', async (req, res) => {
    const {nome, preco, descricao, categoria} = req.body;
    try {
        const novoProduto = new Produto({ nome, preco, descricao, categoria });
        await novoProduto.save();
        res.status(201).json(novoProduto);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Erro ao criar produto'});
    }
});


api.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, preco, descricao, categoria} = req.body;

    try{
        const produto = await Produtos.findBy(id);

        if(!produto){
            return res.status(404).json({ message: 'Produto não encontrado!!' })
        }

        produto.nome = nome;
        produto.preco = preco;
        produto.descricao = descricao;
        produto.categoria = categoria;

        await produto.save();
        res.status(200).json(produto)

        
    }catch{
        res.status(500).json({ message: 'Erro ao atualizar produto'})
    }

});

module.exports = api;