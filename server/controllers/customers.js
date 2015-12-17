var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
// 2 lines above allow us to access our model through var Customer;

module.exports = (function() {
  return {
    //this function will call to DB;
    // retrieve data;
    // check for errors;
    // http response with json to factory;
    show: function(req, res) {
      Customer.find({ $query: {}, $orderby: { created_at : -1 } }, function(err, customers) {
        if (err) {
          res.json("error");
        } else {
          res.json(customers);
        }
      });
    },
    add: function(req, res) {
      var customer = new Customer({
        name: req.body.name,
        created_at: Date()
      });
      // console.log(req.body.name);
      // check if this new customer is in db
      Customer.findOne({"name": req.body.name}, function(err, response){
        if (response) {
          res.json("found");
          return;
        } else {
          customer.save(function(err) {
            if (err) {
              res.json("error");
            } else {
              console.log("successfully added");
              res.json("success");
            }
          });
        }
      });
    },

    delete: function(req, res) {
      Customer.remove({
        _id: req.body._id
      }, function(err) {
        if (err) {
          res.json("error");
        } else {
          console.log("successfully deleted");
          res.json("success");
        }
      });
    }

  };
})();
