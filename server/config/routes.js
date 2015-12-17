
// require the controller here;
var customers = require('../controllers/customers.js');
var orders = require('../controllers/orders.js');
var products = require('../controllers/products.js');



// define routes here, all back end functions to execute db query;
module.exports = function(app){
  app.get('/dashboard');
  app.get('/customers', customers.show);
  app.post('/add-customer', customers.add);
  app.post('/delete-customer', customers.delete);

  app.get('/orders', orders.show);
  app.post('/add-order', orders.add);
  app.post('/delete-order', orders.delete);

  app.get('/products', products.show);
  app.post('/add-product', products.add);
};
