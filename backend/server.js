import express from 'express';
// add colors.js
import colors from 'colors';
import morgan from 'morgan';

import path from 'path';

// this MongoDB connection
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// this without MongoDB
// import products from './data/products.js' 

//this with MongoDB
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// add error middleWare
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// add morgan HTTP req logger only for DEV mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// body like json
app.use(express.json())


//simple middleware
// app.use( (req, res, next) => {
//     // console.log('HELLO');
//     console.log(req.originalUrl);
//     next();
// });


app.get('/', (req, res) => {
    res.send('API in backend (EXPRESS.JS) is running...')
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

//add get reques for paypal id from 'developer.paypal.com/developer/applications'
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// for upload folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// errorMiddleware
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000 ;
app.listen( PORT, console.log(`Server running in <<${process.env.NODE_ENV} mode>> on PORT: ${PORT}`.yellow.bold) );