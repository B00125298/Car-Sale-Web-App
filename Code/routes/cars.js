const express = require('express');
const router = express.Router();
const Car = require('../models/car'); // Assuming you have a Car model

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.sendFile(__dirname + '/../carList.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);

    if (car) {
      res.sendFile(__dirname + '/../carDetails.html');
    } else {
      res.status(404).send('Car not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
