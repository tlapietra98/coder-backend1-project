import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
        index: true,
        unique: true
    },
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
} );

// Plugin
productSchema.plugin(mongoosePaginate);

// Export the model for use in our routes
export const productModel = mongoose.model(productsCollection, productSchema);