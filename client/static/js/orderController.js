var app = angular.module("app");


app.factory('OrderFactory', function($http) {
  var factory = {};

  factory.getOrders = function(callback) {
    $http.get('/orders').success(function(response) {
      callback(response);
    });
  };

  factory.addOrder = function(order , callback) {
      $http.post('/add-order', order).success(function(response) {
        callback(response);
      });
  };

  factory.deleteOrder = function(order , callback) {
      $http.post('/delete-order', order).success(function(response) {
        callback(response);
      });
  };

  return factory;
});




app.controller('orderController', function($scope, OrderFactory, CustomerFactory, ProductFactory) {

  OrderFactory.getOrders(function(data) {
    // console.log(data);
    $scope.orders = data;
  });

  CustomerFactory.getCustomers(function(data) {
    $scope.customers = data;
  });

  ProductFactory.getProducts(function(data) {
    $scope.products = data;
  });

  $scope.addOrder = function() {
    $scope.submitted = true;

    var new_order = $scope.new_order;
    if(!new_order ||
       !new_order.customer_id ||
       !new_order.product_id ||
       !new_order.qty){
        return;
    }

    OrderFactory.addOrder(new_order, function(response) {
      // console.log(new_order);

    // find one product by id, after an order, remove ordered qty;
      if(response.status === "success"){
        OrderFactory.getOrders(function(data) {
          $scope.orders = data;
          $scope.new_order = '';
          $scope.submitted = false;

        });
      }
      else if(response.status === "error"){
        $scope.warning = response.message;
      }
    });
  };

  $scope.deleteOrder = function(order) {
    OrderFactory.deleteOrder(order, function(response) {

      if(response === "success"){
        OrderFactory.getOrders(function(data) {
          $scope.orders = data;
        });
      }
      else if(response === "error"){
        $scope.warning = "something wrong...";
      }
    });
  };
});
