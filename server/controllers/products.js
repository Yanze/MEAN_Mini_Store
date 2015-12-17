var mongoose = require('mongoose');
var Product = mongoose.model('Product');
// 2 lines above allow us to access our model through var Friend;

module.exports = (function(){
  return {
    //this function will call to DB;
    // retrieve data;
    // check for errors;
    // http response with json to factory;
    show: function(req, res){
      Product.find({}, function(err, products){
        if(err){
          res.json("error");
        }
        else{
          res.json(products);
        }
      });
    },

    getOne: function(req, res){
      Product.find({_id: req.body._id}, function(err, product){
        if(err){
          res.json("error");
        }
        else{
          res.json(product);
        }
      });
    },

    add: function(req, res){
      var product = new Product({
      name: req.body.name,
      img: req.body.img,
      description: req.body.description,
      qty: req.body.qty
    });

    product.save(function(err){
      if(err){
        res.json("error");
      }
      else{
        console.log("successfully added");
        res.json("success");
      }
    });
  }


  };
})();
