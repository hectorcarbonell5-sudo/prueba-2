import mongoose from 'mongoose';

const connectDB = async () => {
    const connectionString = process.env.DB_CONNECTION_STRING;
    if (!connectionString) {
        console.error("DB_CONNECTION_STRING is not defined in environment variables");
        process.exit(1);
    }
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
