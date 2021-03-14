import express from 'express';
// add colors.js
import colors from 'colors';

// this MongoDB connection
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// this without MongoDB
// import products from './data/products.js' 

//this with MongoDB
import productRoutes from './routes/productRoutes.js'

// add error middleWare
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

//simple middleware
// app.use( (req, res, next) => {
//     // console.log('HELLO');
//     console.log(req.originalUrl);
//     next();
// });


app.get('/', (req, res) => {
    res.send('API is running now...')
});

// ------------------+products with routes+ 
app.use('/api/products', productRoutes);

// errorMiddleware
app.use(notFound);
app.use(errorHandler);

// ------------------products with routes

const PORT = process.env.PORT || 5000 ;
app.listen( PORT, console.log(`Server running in <<${process.env.NODE_ENV} mode>> on PORT: ${PORT}`.yellow.bold) );