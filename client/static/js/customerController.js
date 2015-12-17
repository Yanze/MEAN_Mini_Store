var app = angular.module("app");

// create the FriendFactory
app.factory('CustomerFactory', function($http) {
  var factory = {};

  factory.getCustomers = function(callback) {
    $http.get('/customers').success(function(response) {
      // http request to a url of our back end routes.js;
      // run a callback when successful as it gets data;
      callback(response);
    });
  };

  factory.addCustomer = function(customer, callback) {
    if(customer){
      $http.post('/add-customer', customer).success(function(response) {
        callback(response);
      });
    }
  };


  factory.deleteCustomer = function(customer, callback){
    $http.post('/delete-customer', customer).success(function(response){
        callback(response);
    });
  };

  return factory;
});





app.controller('customerController', function($scope, CustomerFactory) {
  CustomerFactory.getCustomers(function(data) {
    $scope.customers = data;
  });

  $scope.addCustomer = function() {
    CustomerFactory.addCustomer($scope.new_customer, function(response) {
      if(response === "found"){
        $scope.new_customer = '';
        $scope.warning = "Customer already exists";
      }

      if(response === "success"){
        CustomerFactory.getCustomers(function(data) {
          $scope.warning = '';
          $scope.customers = data;
          $scope.new_customer = '';
        });
      }
      else if(response === "error"){
        $scope.warning = "something wrong...";
      }
    });
  };

  $scope.deleteCustomer = function(customer){
    CustomerFactory.deleteCustomer(customer, function(response){
      if(response === "success"){
        CustomerFactory.getCustomers(function(data) {
          $scope.customers = data;
        });
      }
      else if(response === "error"){
        $scope.warning = "something wrong...";
      }
    });
  };

});
