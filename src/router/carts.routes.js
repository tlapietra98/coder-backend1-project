import { Router } from "express";
import { ProductManager } from "../productManager.js";
import { CartManager } from "../cartManager.js";


const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();



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