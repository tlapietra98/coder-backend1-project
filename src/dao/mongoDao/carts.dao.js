import { cartModel } from "../models/cart.model.js";

class CartDao{
    
    async getAll(){
        return await cartModel.find()
    }

    async getById(id){
        return await cartModel.findById(id)
    }

    async create(data){
        return await cartModel.create(data);
    }

    async update(id, data){
        return await cartModel.findByIdAndUpdate(id, data, { new:true });
    }

    async delete(id){
        return await cartModel.findByIdAndDelete(id); // Esto esta mal, deberia eliminar los productos, creo
    }

    async deleteProduct(cid, pid){
        const cart = await cartModel.findById(cid);
        const productFilter = cart.products.filter(p => p.prodID != pid)

        return await cartModel.findByIdAndUpdate(cid, { products: productFilter }, {new: true});
    }

    async deleteAllProducts(cid){

        return await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
    }

    async updateProduct(cid, pid, quantity){
        const cart = await cartModel.findById(cid);
        const product = cart.products.find(p => p.prodID === pid)
        product.quantity = quantity;

        return await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
    }
}

export const cartDao = new CartDao();