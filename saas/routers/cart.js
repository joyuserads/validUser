const express = require("express");
const api = express.Router();
const produtos = require("../controllers/produtoController");
const Cart = require("../middlewares/schema/cart");
let cart = [];

api.get("/", (req, res) => {
    res.json({  cart });
});

api.patch("/", (req, res) => {
    const { idProduto, quant } = req.body;
    const itemInCart = cart.find(item => item.produto.id === idProduto);

    if(itemInCart){
        itemInCart.quant = quant;
        return res.status(200).json({ message: "Quantidade atualizada", cart });
    }

    return res.status(404).json({ message: "Produto não encontrado no carrinho" });
});

/*api.post("/add",  async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(error){
        res.status(500).json({ message: "Erro ao buscar carrinho" });
    }
})*/
api.post("/add", async (req, res) => {
    const { idProduto, quantidade } = req.body;
    try {
        // Crie um novo item no carrinho
        //const novoItem = new Cart({ idProduto, quantidade });
        const carts = await Cart.find().populate('idProduto');
        await novoItem.save();

        res.status(201).json({ message: "Produto adicionado ao carrinho", item: novoItem });
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar produto ao carrinho" });
    }
});

/*api.post("/add",  (req, res) => {
    const { idProduto, quant } = req.body;
    const produto = produtos.find(p => p.id === idProduto);


    if(!produto) return res.status(404).json({ message: "Produto não encontrado!!"});


    const itemInCart = cart.find( item => item.produto.id === idProduto);

    if(itemInCart){
        itemInCart.quant += quant;
    }else{
        cart.push({ produto, quant });
    }
    
    res.status(200).json({ message: "Produto adicionado ao carrinho", cart});
    
});
*/


api.delete("/remove/:idProduto", (req, res) => {
    const { idProduto } = req.params;
    cart = cart.filter(item => item.produto.id !== idProduto);
    res.status(200).json({message: "Produto removido do carrinho com sucesso!!!", cart});
});

module.exports = api;