import fs from "fs";
import { v4 as uuid } from "uuid";

export class CartManager{

    constructor(){
        this.carts = [];
        this.path = "./src/data/carts.json";
    }

    // Get all carts
    async getCarts(){
            
        const file = await fs.promises.readFile(this.path, "utf-8");
        const fileParse = JSON.parse(file);

        this.carts = fileParse || [];

        return this.carts;
    }

    // Get cart by ID
    async getCartById(cid){
            
        await this.getCarts();

        const cart = this.carts.find((cart) => cart.id === cid);
        if (!cart) throw new Error("Cart not found!");

        return cart;
    }

    // Create a cart
    async createCart(){
            
        await this.getCarts();

        const newCart = {
          id: uuid(),
          products: [],
        };

        this.carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));

        return newCart;
    }

    // Add product to cart
    async addProductToCart(cid, pid){
            
        const cart = await this.getCartById(cid);

        const product = cart.products.find((product) => product.id === pid);

        if (!product) {
          // If product doesn't exist in cart, add it
          cart.products.push({ id: pid, quantity: 1 });
        } else {
          // If product does exist in cart, increase quantity by 1
          product.quantity++;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));

        return cart;
    }
}