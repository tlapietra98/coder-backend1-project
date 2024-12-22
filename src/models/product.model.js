import mongoose from "mongoose";

// Define the name of the collection
const productsCollection = "products";

// Define the schema of the document
const productSchema = new mongoose.Schema( {
    title: String,
    category: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
} );


// Export the model for use in our routes
export const productModel = mongoose.model(productsCollection, productSchema);