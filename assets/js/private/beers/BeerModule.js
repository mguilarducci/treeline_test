angular.module('BeerModule', ['ngRoute', 'toastr', 'compareTo'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/beers', {
      templateUrl: '/views/beers/beers_list.html',
      controller: 'BeerController'
    })
    .when('/beers/new', {
      templateUrl: '/views/beers/beers_form.html',
      controller: 'BeerController'
    })
    .when('/beers/:id', {
      templateUrl: '/views/beers/beers_stock_form.html',
      controller: 'BeerController'
    })
    .when('/stock', {
      templateUrl: '/views/beers/beers_stock_list.html',
      controller: 'BeerController'
    });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(false);
});