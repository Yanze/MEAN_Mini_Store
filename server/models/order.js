// require mongoose
var mongoose = require('mongoose');

// this is db collection model, il should be exactly same as your db collection
//
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var OrderSchema = new mongoose.Schema({
  customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
  product: {type: Schema.Types.ObjectId, ref: 'Product'},
  qty: Number,
  ordered_at: {type: Date, default: new Date()}
});

// register schema as a model
// this file will run when we require it using our config file
// since the model is defined, we will access it from our controller;
mongoose.model('Order', OrderSchema);
