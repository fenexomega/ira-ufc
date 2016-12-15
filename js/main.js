var app = angular.module("mainApp",['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'templates/home.html',
      controller: 'iraController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
