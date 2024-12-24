import { Router } from "express";
//import { ProductManager } from "../managers/productManager.js";
import { productModel } from "../models/product.model.js";

const router = Router();
//const productManager = new ProductManager();

// Get products
router.get("/", async (req, res) => {

    try {
        const products = await productModel.find();
        res.json({status: "ok", payload: products});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});


// Get product by ID
router.get("/:pid", async (req,res) => {
    const { pid } = req.params;

    try {
        const findProduct = await productModel.findById(pid);
        if(!findProduct) return res.json({status: "error", message: `Product with ID ${pid} not found!`})
        
        const product = await productModel.findById(pid);

        res.json({status: "ok", payload: product});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});


// Create/Post a product
router.post("/", async (req, res) => {
    
    const body = req.body;

    try {
        const product = await productModel.create(body);

        //res.status(201).send(product);
        res.json({status: "ok", payload: product});

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
        const findProduct = await productModel.findById(pid);
        if(!findProduct) return res.json({status: "error", message: `Product with ID ${pid} not found!`})

        const product = await productModel.findByIdAndUpdate(pid, body, {new: true});

        res.json({status: "ok", payload: product});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});


// Delete a product
router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const findProduct = await productModel.findById(pid);
        if(!findProduct) return res.json({status: "error", message: `Product with ID ${pid} not found!`})
        
        const product = await productModel.findByIdAndDelete(pid)

        res.json({status: "ok", message: `Product with ID ${pid} deleted!`});
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
})


export default router;