import mongoose from "mongoose";

// Define the name of the collection
const cartsCollection = "carts";

// Define the schema of the document
const cartSchema = new mongoose.Schema( {
    products: {
        type: [{ prodID: { type: mongoose.Schema.Types.ObjectId, ref: "products" }, quantity: Number }],
        default: [],
    },
} );



// Middleware
// Before using the find & findById methods, it will run these functions
cartSchema.pre("find", function(){
    // The word this references this document
    this.populate("products.prodID");
});

// Export the model for use in our routes
export const cartModel = mongoose.model(cartsCollection, cartSchema);