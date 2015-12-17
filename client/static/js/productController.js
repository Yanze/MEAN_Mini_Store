var app = angular.module("app");

app.factory('ProductFactory', function($http){
  var factory = {};
  factory.getProducts = function(callback){
    $http.get('/products').success(function(response){
      callback(response);
    });
  };

  // factory.getOneProduct = function(callback){
  //   $http.get('/prodct').success(function(response){
  //     callback(response);
  //   });
  // };

  factory.addProduct = function(product, callback) {
    $http.post('/add-product', product).success(function(response) {
      callback(response);
    });
  };

  return factory;
});


app.controller('productController', function($scope, ProductFactory) {
  ProductFactory.getProducts(function(data) {
    $scope.products = data;
  });


  // ProductFactory.getOneProduct(function(data){
  //   $scope.product = data;
  // });

  $scope.addProduct = function() {
    $scope.submitted = true;
    var new_product = $scope.new_product;
    if(!new_product ||
       !new_product.name ||
       !new_product.img ||
       !new_product.description ||
       !new_product.qty){
         return;
       }

    ProductFactory.addProduct(new_product, function(response) {
      if(response === "success"){
        ProductFactory.getProducts(function(data) {
          $scope.products = data;
          $scope.new_product = '';
          $scope.submitted = false;
        });
      }
      else if(response === "error"){
        $scope.warning = "something wrong...";
      }
    });
  };


});
