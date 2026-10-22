import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI;

    if(!mongoUri){
        throw new Error("MONGO_URI is missing from the .env file");
    }

    await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
    })

    console.log("MongoDB connected successfully!")
}

export default connectDB;