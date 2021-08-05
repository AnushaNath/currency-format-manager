'use strict';

angular.module('myApp.countryCurrency', ['ngRoute'])
  .factory('countryCurrencyFormatService',function($http){  
  let currencies = [];
  let locales = [];

  return {
    getCurrencies: function() {
      return $http.get('currency/currency-format.json').then(function successCallback(response) 
      {
        currencies = response.data;
        return currencies;
      },function errorCallback(response){   
        console.log("error in retrieving currency data");
      })
    },
    getLocales: function(){
      return $http.get('currency/locale.json').then(function successCallback(response)
      {
        locales = response.data;
        return locales;
      },function errorCallback(response){
        console.log("error in retrieving locale data");
      })
    },
    getByCurrencyCode: function(code) {
      if (!code) {
        return;
      }
      var currency = currencies[code.toUpperCase()];
      if (!currency) {
        currency = {
          "name": code,
          "fractionSize": 2,
          "symbol": {
            "grapheme": code,
            "template": null,
            "rtl": false
          },
          "uniqSymbol": null
        };
      }
      return currency;
    },
    getLocaleByCode: function(code) {
      if (!code) {
        return;
      }
      code = [code.substr(0, 2).toLowerCase(), code.substr(3, 2).toUpperCase()].join('_');
      return locales[code] || locales['en_US'];
    }
  };
});
angular.module('myApp.countryCurrencyFilterFormat',['myApp.countryCurrency']).filter('currencyFilter', ['$rootScope', '$filter', '$sce', 'countryCurrencyFormatService', function($rootScope, $filter, $sce, countryCurrencyFormatService){
  return function(enteredAmount, selectedCurrencyCode) {
    var fractionSize = arguments[2] !== (void 0) ? arguments[2] : null;
    var useUniqSymbol = arguments[3] !== (void 0) ? arguments[3] : true;
    var localeId = arguments[4] !== (void 0) ? arguments[4] : null;
    var onlyAmount = arguments[5] !== (void 0) ? arguments[5] : false;
    if (!selectedCurrencyCode || Number(enteredAmount) != enteredAmount) {
      return;
    }
    var formattedCurrency,
        currency = countryCurrencyFormatService.getByCurrencyCode(selectedCurrencyCode),
        formatedAmount = Math.abs(enteredAmount),
        signAmount = enteredAmount < 0 ? '-' : '',
        rtl = false;
    var currentFractionSize = currency.fractionSize;
    if (fractionSize !== null) {
      currentFractionSize = fractionSize;
    }
    formatedAmount = formatedAmount.toFixed(currentFractionSize);
    localeId = localeId ? localeId : ($rootScope.currencyLanguage || 'en_US');
    var languageOptions = countryCurrencyFormatService.getLocaleByCode(localeId);
    formatedAmount = formatedAmount.split('.').join(languageOptions.decimal);
    formatedAmount = formatedAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languageOptions.thousands);
    if (onlyAmount) {
      formattedCurrency = signAmount + formatedAmount;
    } else if (!!currency && !useUniqSymbol && !!currency.symbol && !!currency.symbol.template) {
      formattedCurrency = currency.symbol.template.replace('1', formatedAmount);
      formattedCurrency = formattedCurrency.replace('$', currency.symbol.grapheme);
      formattedCurrency = signAmount + formattedCurrency;
      rtl = !!currency.symbol.rtl;
    } else if (!!currency && !!useUniqSymbol && !!currency.uniqSymbol && !!currency.uniqSymbol.template) {
      formattedCurrency = currency.uniqSymbol.template.replace('1', formatedAmount);
      formattedCurrency = formattedCurrency.replace('$', currency.uniqSymbol.grapheme);
      formattedCurrency = signAmount + formattedCurrency;
      rtl = !!currency.uniqSymbol.rtl;
    } else {
      formattedCurrency = signAmount + formatedAmount + ' ' + selectedCurrencyCode;
    }
    return $sce.trustAsHtml('<span dir="' + (rtl ? 'rtl' : 'ltr') + '">' + formattedCurrency + '</span>');
  };
}]);
