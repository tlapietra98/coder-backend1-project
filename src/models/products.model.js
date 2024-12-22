import mongoose, { mongo } from "mongoose";

// Define the name of the collection
const productCollection = "products";

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
    status: Boolean,
} );


// Export the model for use in our routes
export const productModel = mongoose.model(productCollection, productSchema);