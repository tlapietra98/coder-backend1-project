import fs from "fs";
import { v4 as uuid } from "uuid";

export class CartManager{

    constructor(){
        this.carts = [];
        this.path = "./data/carts.json";
    }


    // Get all carts
    async getCarts(){
        try {
            const file = await fs.promises.readFile(this.path, "utf-8");
            const fileParse = JSON.parse(file);

            this.carts = fileParse || [];

            return this.carts;
        } catch (error) {
            console.log(error);
        }
    }

    // Get cart by ID
    async getCartById(cid){
        try {
            await this.getCarts();

            const cart = this.carts.find( (cart) => cart.id === cid);
            if(!cart) throw new Error("Cart not found!");

            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    // Create a cart
    async createCart(){
        try {
            await this.getCarts();

            const newCart = {
                id: uuid(),
                products: [],
            };

            this.carts.push(newCart);

            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));

            return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    // Add product to cart
    async addProductToCart(cid, pid){
        try {
            const cart = await this.getCartById(cid);

            const product = cart.products.find((product) => product.id === pid);

            if(!product){
                // If product doesn't exist in cart, add it
                cart.products.push({product: pid, quantity: 1});
            } else {
                // If product does exist in cart, increase quantity by 1
                product.quantity++;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));

            return cart;
        } catch (error) {
            console.log(error);
        }
    }
}