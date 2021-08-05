'use strict';

angular.module('myApp.displayCurrencies', ['ngRoute','myApp.countryCurrency']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/display-currencies', {
        templateUrl: 'currency/display-currencies.html',
        controller: 'displayCurrenciesCtrl'
    });
}]).
factory('Excel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
        template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
        format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {

        tableToExcel:function(tableId,worksheetName){
            console.log("table excel");
            var table=$(tableId),
                ctx={worksheet:worksheetName,table:table.html()},
                href=uri+base64(format(template,ctx));
            return href;
        }
    };
}).
controller('displayCurrenciesCtrl', ['$scope','countryCurrencyFormatService', 'Excel', '$timeout', function($scope,countryCurrencyFormatService,Excel,$timeout) {
        $scope.exportToExcel=function(tableId){ 
            var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
            $timeout(function(){location.href=exportHref;},100); 
        }
        countryCurrencyFormatService.getCurrencies().then(function(response){
            const memberArray = Object.values(response)
            $scope.tableData=memberArray;
            $scope.sortColumn="code";
            $scope.reverseSort=false;
            $scope.sortData= function(column){
                $scope.reverseSort= ($scope.sortColumn==column) ? !$scope.reverseSort : false;
                $scope.sortColumn=column;
            }
            $scope.getSortClass= function(column){
                if ($scope.sortColumn==column){
                    return $scope.reverseSort ?  'arrow-down' : 'arrow-up'
                }
                return '';
            }
        });
    }]);