'use strict';

angular.module('myApp.addCurrencies', ['ngRoute']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/add-currencies', {
        templateUrl: 'currency/add-currencies.html',
        controller: 'addCurrenciesCtrl'
    });
}]).controller('addCurrenciesCtrl', ['$scope',function($scope){
     $scope.currenciesValues = [
        {
          currency: "USD",
          name: "US Dollar",
          fractionSize: 2,
          symbol: "US$",
          editable:false
        },
        {
          currency: "GBP",
          name: "Pound Sterling",
          fractionSize: 2,
          symbol: "£",
          editable:false
        },
        {
          currency: "EUR" ,
          name: "Euro",
          fractionSize: 2,
          symbol: "€",
          editable:false
        },
        {
          currency: "INR",
          name: "Indian Rupee",
          fractionSize: 2,
          symbol: "₹",
          editable:false
        },
        {
          currency: "CAD",
          name: "Canadian Dollar",
          fractionSize: 2,
          symbol: "$",
          editable:false
        },
        {
          currency: "JPY",
          name: "Yen",
          fractionSize: 0,
          symbol: "¥",
          editable:false
        },
        {
          currency: "ARS",
          name: "Argentine Peso",
          fractionSize: 2,
          symbol: "$",
          editable:false
        },
        {
          currency : "AUD",
          name: "Australian Dollar",
          fractionSize: 2,
          symbol: "$",
          editable:false
        }
      ];
    $scope.entity = {}
	    
	$scope.edit = function(index){
	   $scope.entity = $scope.currenciesValues[index];
	   $scope.entity.index = index;
	   $scope.entity.editable = true;
	}
	    
	$scope.delete = function(index){
	   $scope.currenciesValues.splice(index,1);
	}
	    
	$scope.save = function(index){
	   $scope.currenciesValues[index].editable = false; 
	}
     
    $scope.add = function(){
      $scope.currenciesValues.push({
        currency : "",
        name: "",
        fractionSize : "",
        symbol : "",
        editable: true
      })
    } 
}]);
       
