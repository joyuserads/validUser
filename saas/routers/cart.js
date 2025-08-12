const express = require("express");
const api = express.Router();
const produtos = require("../controllers/produtoController");
const Cart = require("../middlewares/schema/cart");
let cart = [];


api.get("/", async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar carrinho" });
    }
});

api.get("/:idProduto", async (req, res) => {
    try {
        const { idProduto } = req.params;
        const itemInCart = await Cart.findOne({ idProduto });
        if (itemInCart) {
            return res.status(200).json(itemInCart);
        }
        return res.status(404).json({ message: "Produto não encontrado no carrinho" });
    } catch (error) {
        console.error('Erro ao buscar produto no carrinho:', error);
        return res.status(500).json({ message: "Erro ao buscar produto no carrinho" });
    }
});

api.patch("/:idProduto", async (req, res) => {
    const { idProduto } = req.params;
    const { quant } = req.body;

    try {
        const itemInCart = await Cart.findOne({ idProduto });

        if (itemInCart) {
            itemInCart.quant = quant;
            await itemInCart.save();
            return res.status(200).json({ message: "Quantidade atualizada", itemInCart });
        }

        return res.status(404).json({ message: "Produto não encontrado no carrinho" });
    } catch (error) {
        console.error('Erro ao atualizar produto no carrinho:', error);
        return res.status(500).json({ message: "Erro ao atualizar produto no carrinho" });
    }
});

api.post("/add", async (req, res) => {
    const { idProduto, quant } = req.body;
    try {
        // Crie um novo item no carrinho
        const novoItem = new Cart({ idProduto, quant });
        //const carts = await Cart.find().populate('idProduto');
        await novoItem.save();

        res.status(201).json({ message: "Produto adicionado ao carrinho", novoItem });
    } catch (error) {
        console.log('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).json({ message: "Erro ao adicionar produto ao carrinho" });
    }
});


api.delete("/remove/:idProduto", (req, res) => {
    const { idProduto } = req.params;
    cart = cart.filter(item => item.produto.id !== idProduto);
    res.status(200).json({message: "Produto removido do carrinho com sucesso!!!", cart});
});

module.exports = api;