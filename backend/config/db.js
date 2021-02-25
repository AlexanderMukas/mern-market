import mongoose from 'mongoose';

// use async/await because return the Promise
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })


        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // exit with FAILURE - 1
        process.exit(1);
    }
}

export default connectDB;