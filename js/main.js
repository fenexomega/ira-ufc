  'use strict';

  var controllers = angular.module('mainApp.controllers',[]);
  var services    = angular.module('mainApp.services',[]);
  var directives  = angular.module('mainApp.directives',[]);
  var constants   = angular.module('mainApp.constants',[]);

  // Controllers
  // require('./controllers/iraController.js');

  // Services
  // require('./services/iraService.js');

  var app = angular.module("mainApp",[
    /* Módulos da aplicação */
    'ngRoute',

    /* Nossos módulos */
    'mainApp.controllers','mainApp.services', 'mainApp.directives', 'mainApp.constants'
  ]);

  app.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'templates/home.html',
      controller: 'IraController'
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  })
