const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: Number,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
