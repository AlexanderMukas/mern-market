const express = require('express'); // commonJS
const products = require('./data/products');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.get('/api/products', (req, res) => {
    res.json(products)
});

app.listen( PORT, console.log(`Server running on port ${PORT}...`) );