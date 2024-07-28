const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  total: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
