var app = angular.module("app");

// app.factory('DashboardFactory', function($http) {
//   var factory = {};
//
//   factory.getDashboard = function(callback) {
//     $http.get('/dashboard').success(function(response) {
//       callback(response);
//     });
//   };
//
//   return factory;
// });

app.controller('dashboardController', function($scope, OrderFactory, CustomerFactory, ProductFactory) {

  OrderFactory.getOrders(function(data) {
    $scope.orders = data;
  });

  CustomerFactory.getCustomers(function(data) {
    $scope.customers = data;
  });

  ProductFactory.getProducts(function(data) {
    $scope.products = data;
  });


});
