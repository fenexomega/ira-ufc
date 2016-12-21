  'use strict';
  var services = angular.module('mainApp.services');
  var ENVIAR_DADOS = 'http://localhost:8080/api/dados';

  function IraService($http)
  {
    this.getDados = function()
    {
      if(localStorage.dados != undefined)
        return JSON.parse(localStorage.dados);
      return {
        "semestres":[{
          "periodo": 1,
          "media": 10.0,
          "disciplinas":[
            {
              "nome":"Fundamentos de Programação",
              "nota":10,
              "carga":96,
              "trancada":false
            }
          ]
          }]
        };
    }

    this.sincronizarDados = function(dados,success_callback,error_callback)
    {
      var parametro = JSON.stringify(dados);
      localStorage.dados = parametro;
      $http.post(URL,parametro)
      .success(function(data,status,headers,config){
        if(success_callback !== undefined)
          success_callback(data,status,headers,config);
      })
      .error(function(data,status,headers,config){
        if(error_callback !== undefined)
          error_callback(data,status,headers,config);
      });
    }
  };

  services.service("IraService",IraService);

  IraService.$inject = ['$http'];
