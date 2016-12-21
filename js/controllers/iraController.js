  'use strict';
  var controllers = angular.module('mainApp.controllers');
  var URL = "http://localhost:8080";
  var timeoutRef;

  function IraController($scope,IraService)
  {
    $scope.disciplina = {carga: 64,nota: 7.0,semestre: 1};
    $scope.dados = IraService.getDados();
    $scope.ira = calcIra($scope.dados);

    // Quando o modelo 'dados' mudar
    $scope.$watch('dados',function(){
      $scope.ira = calcIra($scope.dados);

      // Caso não tenha sincronizado ainda, limpe o timeout
      if(timeoutRef !== undefined)
        clearTimeout(timeoutRef);

      timeoutRef = setTimeout(function(){
          IraService.sincronizarDados($scope.dados)
        },3000);
    },true);


    function acharSemestreOuCriar(periodo)
    {
      for (var semestre of $scope.dados.semestres) {
        if(semestre.periodo == periodo)
        return semestre;
      }
      var semestre = {"periodo": periodo, "disciplinas": [] };
      $scope.dados.semestres.push(semestre)
      return semestre;
    }

    $scope.addDisciplina = function(disciplina)
    {
      var semestre = acharSemestreOuCriar(disciplina.semestre);
      var valorSemestre = disciplina.semestre;
      delete disciplina.semestre;
      semestre.disciplinas.push(disciplina);
      $scope.dados.semestres.sort(function(d1,d2){
        return d1.periodo - d2.periodo;
      });
      $scope.disciplina = {carga: disciplina.carga,nota: disciplina.nota,semestre: valorSemestre};
      $scope.ira = calcIra($scope.dados);

    }

    $scope.removerDisciplina = function(semestre,disciplina)
    {
      var index = semestre.disciplinas.indexOf(disciplina);
      semestre.disciplinas.splice(index,1);
      if(semestre.disciplinas.length == 0)
      {
        index = $scope.dados.semestres.indexOf(semestre);
        $scope.dados.semestres.splice(index,1);
      }
    }

    function calCargaTotal(obj,periodo)
    {
      var total = 0
      for(var semestre of obj.semestres)
      {
        if(periodo !== undefined && semestre.periodo > periodo)
        {
          break;
        }
        for(var d of semestre.disciplinas)
        {
          total += d.carga
        }
      }
      return total
    }

    function calcIra(obj)
    {
      // formula tirada de
      // http://www.prograd.ufc.br/perguntas-frequentes/384-perguntas-frequentes-ira
      var A1 = 0,B1 = 0;
      var C  = 0;
      var CT = 0; //carga das trancadas
      var coefTrancamento = 1;
      for(var semestre of obj.semestres)
      {
        C  = calCargaTotal(obj,semestre.periodo); //carga total
        for(var d of semestre.disciplinas)
        {
          if(d.trancada == true)
          {
            CT += d.carga;
          }
          else
          {
            A1 += Math.min(6,semestre.periodo) * d.carga * d.nota;
            B1 += Math.min(6,semestre.periodo) * d.carga;
          }
        }
        coefTrancamento = 1.0 - ((CT/2)/C);
        semestre.media = coefTrancamento*(A1/B1);
      }
      return coefTrancamento*(A1/B1)
    }
  }

  controllers.controller('IraController',IraController);

  IraController.$inject = ['$scope','IraService'];
