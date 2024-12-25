import { Router } from "express";
//import { ProductManager } from "../managers/productManager.js";
//import { CartManager } from "../managers/cartManager.js";
import { cartModel } from "../dao/models/cart.model.js";
import { productModel } from "../dao/models/product.model.js";
import { cartDao } from "../dao/mongoDao/carts.dao.js";
import { productDao } from "../dao/mongoDao/products.dao.js";


const router = Router();
//const productManager = new ProductManager();
//const cartManager = new CartManager();


// Get all carts
router.get("/", async (req, res) => {
    
    try {
        const carts = await cartModel.find();
        res.json({status: "ok", payload: carts});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})



// Get a cart by ID
router.get("/:cid", async (req, res) => {
    
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        //const cart = await cartModel.find({_id: cid}); // I want to use the pre populate
        if(!cart) return res.json({status: "error", message: `Cart with ID ${cid} not found!`})
        console.log("Found requested cart with ID:" + cart._id);


        res.json({status: "ok", payload: cart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})


// Create a cart
router.post("/", async (req, res) => {
    
    const body = req.body;
    
    try {
        const cart = await cartModel.create(body);
        res.json({status: "ok", payload: cart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})


// Add product to cart
router.post("/:cid/product/:pid", async (req, res) => {

    const { cid, pid } = req.params;

    try {
        const product = await productDao.getById(pid);
        if(!product) return res.json({status: "error", message: `Product with ID ${pid} not found!`})

        let cart = await cartDao.getById(cid);
        if(!cart) return res.json({status: "error", message: `Cart with ID ${cid} not found!`})

        const cartProduct = cart.products.find((p) => p.prodID === pid);

        if (!cartProduct) {
            // If the product doesn't exist in the cart, add it
            cart.products.push({prodID: pid, quantity: 1});
        } else {
            // If the product exists in the cart, we increase its quantity by 1
            cartProduct.quantity++;
        }

        cart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, {new: true});
        
        res.json({status: "ok", payload: cart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});


// Update product quantity
router.put("/:cid/product/:pid", async (req, res) => {

    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const product = await productDao.getById(pid);
        if(!product) return res.json({status: "error", message: `Product with ID ${pid} not found!`})

        let cart = await cartDao.getById(cid);
        if(!cart) return res.json({status: "error", message: `Cart with ID ${cid} not found!`})

        const updatedCart = await cartDao.updateProduct(cid, pid, quantity);

        res.json({status: "ok", payload: updatedCart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});


// Delete a cart by ID
router.delete("/:cid", async (req, res) => {
    
    const { cid } = req.params;

    try {
        let cart = await cartDao.getById(cid);
        if(!cart) return res.json({status: "error", message: `Cart with ID ${cid} not found!`})

        cart = await cartDao.delete(cid);

        res.json({status: "ok", message: `Cart with ID ${cid} deleted!`});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})


// Delete product from cart
router.delete("/:cid/product/:pid", async (req, res) => {

    const { cid, pid } = req.params;

    try {
        const product = await productDao.getById(pid);
        if(!product) return res.json({status: "error", message: `Product with ID ${pid} not found!`})

        let cart = await cartDao.getById(cid);
        if(!cart) return res.json({status: "error", message: `Cart with ID ${cid} not found!`})

        const updatedCart = await cartDao.deleteProduct(cid, pid);
        
        res.json({status: "ok", payload: updatedCart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});


export default router;