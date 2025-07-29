import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    if(!process.env.MONGODB_URL) return console.log("MONGO_URI not found")
    if(isConnected) return console.log("Already connected to MongoDB");

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}