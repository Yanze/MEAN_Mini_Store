// require mongoose
var mongoose = require('mongoose');

// this is db collection model, il should be exactly same as your db collection
var ProductSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  qty: Number
});

// register schema as a model
// this file will run when we require it using our config file
// since the model is defined, we will access it from our controller;
mongoose.model('Product', ProductSchema);
