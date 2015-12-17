
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Customer = mongoose.model('Customer');
// 2 lines above allow us to access our model through var Friend;

module.exports = (function(){
  return {
    //this function will call DB;
    // retrieve data;
    // check for errors;
    // http response with json to factory;
    show: function(req, res){
      Order.find({})
        .populate('product')
        .populate('customer')
        .exec(function(err, orders){
          if(err){
            res.json("error");
          }
          else{
            res.json(orders);
          }
        });
    },
    add: function(req, res){
      Product.findOne({_id:req.body.product_id}, function(err,product){
        Customer.findOne({_id:req.body.customer_id}, function(err,customer){

          if(product.qty < req.body.qty){
            res.json({status:"error",
                      message:"Not enough product available."});
            return;
          }

          product.qty -= req.body.qty;
          product.save();  

          var order = new Order({
            customer: customer._id,
            product: product._id,
            qty: req.body.qty,
          });

          order.save(function(err){
            if(err){
              res.json({status:"error",
                        message:"something wrong..."});
            }
            else{
              console.log("successfully added");
              res.json({status:"success",
                        message:""});
            }
          });
        });
      });
  },

  delete: function(req, res){
    Order.remove({_id: req.body._id}, function(err){
      if(err){
        res.json("error");
      }
      else{
        console.log("successfully deleted");
        res.json("success");
      }
    });
  }


  };
})();
