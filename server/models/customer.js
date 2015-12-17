// require mongoose
var mongoose = require('mongoose');

// this is db collection model, il should be exactly same as your db collection
var CustomerSchema = new mongoose.Schema({
  name: String,
  created_at: {type: Date, default: new Date()}
});

// register schema as a model
// this file will run when we require it using our config file
// since the model is defined, we will access it from our controller;
mongoose.model('Customer', CustomerSchema);
