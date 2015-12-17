var app = angular.module('app', ["ngRoute", "ngMessages", "angularMoment"]);


app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: 'partials/dashboard.html',
    })
    .when("/orders", {
      templateUrl: 'partials/orders.html',
      controller: 'orderController'
    })
    .when("/products", {
      templateUrl: 'partials/products.html',
      controller: 'productController'
    })
    .when("/customers", {
      templateUrl: 'partials/customers.html',
      controller: 'customerController'
    });
});
