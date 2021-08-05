'use strict';

angular.module('myApp', 
  ['ngRoute',
  'myApp.countryCurrency',
  'myApp.countryCurrencyFilterFormat',
  'myApp.displayCurrencies',
  'myApp.addCurrencies'
  ]).
  config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/'});
    }]).
    controller('currencyCtrl', ['$scope', '$rootScope', 'countryCurrencyFormatService', function ($scope, $rootScope, countryCurrencyFormatService) {
      countryCurrencyFormatService.getCurrencies().then(function(response){
        $scope.currencies=response;
      });
      countryCurrencyFormatService.getLocales().then(function(response){
        $scope.localeIds=response;
      });    
      $scope.$watchGroup(['enteredAmount', 'selectedCurrencyCode' , 'fractionSize'], function (){
        $scope.currencyInfo = countryCurrencyFormatService.getByCurrencyCode($scope.selectedCurrencyCode);
      });  
      $scope.$watch('selectedCurrencyLocaleId', function () {
        $scope.formatCurrencyAmount = countryCurrencyFormatService.getLocaleByCode($scope.selectedCurrencyLocaleId);
      });
  }]);