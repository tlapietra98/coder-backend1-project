import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";
import { productModel } from "../models/products.model.js";

const router = Router();
const productManager = new ProductManager();



// MONGO DB

// Get products
router.get("/mongodb", async (req, res) => {

    try {
        const products = await productModel.find();
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});


// Create/Post a product
router.post("/mongodb", async (req, res) => {
    
    const body = req.body;

    try {
        const product = await productModel.create(body);

        res.status(201).send(product);

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});


// ----------



// Get products
router.get("/", async (req, res) => {
    const { limit } = req.query;

    try {
        const products = await productManager.getProducts(limit);
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});

// Get product by ID
router.get("/:pid", async (req,res) => {
    const { pid } = req.params;

    try {
        const product = await productManager.getProductById(pid);

        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});

// Create/Post a product
router.post("/", async (req, res) => {
    const body = req.body;

    try {
        const product = await productManager.addProduct(body);

        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

// Modify/Put a product
router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const body = req.body;

    try {
        console.log(pid);
        console.log(body);

        const product = await productManager.updateProduct(pid, body);

        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});

// Delete a product
router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await productManager.deleteProduct(pid);

        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})

export default router;