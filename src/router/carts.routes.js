import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";
import { CartManager } from "../managers/cartManager.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";



const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();



// MONGO DB


// Get all carts
router.get("/mongodb", async (req, res) => {
    
    try {
        const carts = await cartModel.find();
        res.json({status: "ok", payload: carts});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})



// Get a cart by ID
router.get("/mongodb/:cid", async (req, res) => {
    
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if(!cart) return res.json({status: "error", message: `Cart with ID ${cid} not found!`})

        res.json({status: "ok", payload: cart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})


// Create a cart
router.post("/mongodb", async (req, res) => {
    try {
        const cart = await cartModel.create({});
        res.json({status: "ok", payload: cart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})


// Add product to cart
router.post("/mongodb/:cid/product/:pid", async (req, res) => {

    const { cid, pid } = req.params;

    try {
        const findProduct = await productModel.findById(pid);
        if(!findProduct) return res.json({status: "error", message: `Product with ID ${pid} not found!`})

        const findCart = await cartModel.findById(cid);
        if(!findCart) return res.json({status: "error", message: `Cart with ID ${cid} not found!`})

        const cartProduct = findCart.products.find((product) => product.prodID === pid)
        if (!cartProduct) {
            // If the product doesn't exist in the cart, add it
            findCart.products.push({prodID: pid, quantity: 1});
        } else {
            // If the product exists in the cart, we increase its quantity by 1
            cartProduct.quantity++;
        }

        const cart = await cartModel.findByIdAndUpdate(cid, { products: findCart.products }, {new: true});
        
        res.json({status: "ok", payload: cart});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});



// ----------




// Get all carts
router.get("/", async (req, res) => {
    
    try {
        const carts = await cartManager.getCarts();
        res.status(200).send(carts);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})

// Get a cart by ID
router.get("/:cid", async (req, res) => {
    
    const { cid } = req.params;

    try {
        const cart = await cartManager.getCartById(cid);
        res.status(200).send(cart);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})

// Create a cart
router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).send(cart);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})

// Add product to cart
router.post("/:cid/product/:pid", async (req, res) => {

    const { cid, pid } = req.params;

    try {
        const product = await productManager.getProductById(pid);
        if (!product) throw new Error(`The product with the ID ${pid} cannot be found.`);

        const cart = await cartManager.addProductToCart(cid, pid);

        res.status(200).send(cart);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});

export default router;