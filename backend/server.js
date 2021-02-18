const express = require('express'); // commonJS
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.listen( PORT, console.log(`Server running on port ${PORT}...`) );