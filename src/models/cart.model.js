import mongoose from "mongoose";

// Define the name of the collection
const cartsCollection = "carts";

// Define the schema of the document
const cartSchema = new mongoose.Schema( {
    products: {
        type: Array,
        default: [],
    },
} );


// Export the model for use in our routes
export const cartModel = mongoose.model(cartsCollection, cartSchema);