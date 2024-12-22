import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {

        mongoose.connect("mongodb+srv://tlapietra98:QC8dwzEZcRyo1Xvh@clustercoderbackend1.afbzu.mongodb.net/tlp-backend1");
        console.log("MongoDB Connected!");
        
    } catch (error) {
        console.log(error);
    }


}