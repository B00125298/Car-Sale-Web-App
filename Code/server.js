const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the public folder
app.use(express.static('public'));

// Load the car data from JSON file
const carData = require('./cars.json');

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Serve car data as JSON
app.get('/api/cars', (req, res) => {
    res.json(carData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
