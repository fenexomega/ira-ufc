var app = angular.module("mainApp",['ngRoute']);

app.config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'templates/home.html',
      controller: 'iraController'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});
