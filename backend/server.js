import express from 'express';
import dotenv from 'dotenv';

// add colors.js
import colors from 'colors';

// this MongoDB connection
import connectDB from './config/db.js';

// this without MongoDB
// import products from './data/products.js' // fetch from db now

//this with MongoDB
import productRoutes from './routes/productRoutes.js'

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


//----------------- fetch products -> goto routes ---------------------------

// app.get('/api/products', (req, res) => {
//     res.json(products)
// });


// app.get('/api/products/:id', (req, res) => {
//     const product = products.find( prod => prod._id === req.params.id);
//     res.json(product);
// });
// ------------------+products with routes+ -------------------------------
app.use('/api/products', productRoutes);


app.use( (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});


app.use( (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json( {
        message : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})

// ------------------products with routes -------------------------------

const PORT = process.env.PORT || 5000 ;

app.listen( PORT, console.log(`Server running in <<${process.env.NODE_ENV} mode>> on PORT: ${PORT}`.yellow.bold) );