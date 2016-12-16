angular.module('mainApp').controller('iraController',['$scope', '$http', iraController]);
var URL = "http://localhost:8080";


function iraController($scope, $http)
{
  $scope.disciplina = {carga: 64,nota: 7.0,semestre: 1};

  $scope.dados = getDados();



    $scope.ira = calcIra($scope.dados);

    $scope.$watch('dados',function(){
      $scope.ira = calcIra($scope.dados);

      // Caso não tenha sincronizado ainda, limpe o timeout
      if(typeof timeoutRef !== 'undefined')
        clearTimeout(timeoutRef);
      timeoutRef = setTimeout(sincronizarDados,3000);
      console.log("mudou o dado");
    },true);


    function getDados()
    {
      if(localStorage.dados != undefined)
        return JSON.parse(localStorage.dados);
      return {
        "semestres":[{
          "periodo": 1,
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

    function sincronizarDados()
    {
      var parametro = JSON.stringify($scope.dados);
      localStorage.dados = parametro;
      $http.post(URL,parametro)
      .success(function(data,status,headers,config){

      })
      .error(function(data,status,headers,config){

      });

      // TODO
    }

  function acharSemestreOuCriar(periodo)
  {
    for (semestre of $scope.dados.semestres) {
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
    delete disciplina.semestre;
    semestre.disciplinas.push(disciplina);
    $scope.disciplina = {carga: 64,nota: 7.0,semestre: 1};
    $scope.ira = calcIra($scope.dados);

  }

  $scope.removerDisciplina = function(semestre,disciplina)
  {
    var index = semestre.disciplinas.indexOf(disciplina);
    semestre.disciplinas.splice(index,1);
    if(semestre.disciplinas.length == 0)
      delete semestre;

  }

  function loadJson(name)
  {
  	if(localStorage.disciplinas != undefined)
  		return JSON.parse(fs.readFileSync(name,'utf8'))
  	return { trancadas: [], completas: [], simuladas: []};
  }

  function saveJson(json)
  {
  	var string = JSON.stringify(json)
  	localStorage.disciplinas = json;
  }
  function calCargaTotal(obj)
  {
  	var total = 0
  	for(semestre of obj.semestres)
      for(d of semestre.disciplinas)
  		  total += d.carga
  	return total

  }

  function calcIra(obj)
  {
  	// formula tirada de
  	// http://www.prograd.ufc.br/perguntas-frequentes/384-perguntas-frequentes-ira
  	var A1 = 0,B1 = 0;
  	var C  = calCargaTotal(obj);
  	var CT = 0;
  	var coefTrancamento = 0;
  	for(semestre of obj.semestres)
  	{
  		for(d of semestre.disciplinas)
  			if(d.trancada == true)
  				CT += d.carga;
  			else
  			{
  				B1 += Math.min(6,semestre.periodo) * d.carga
  				A1 += Math.min(6,semestre.periodo) * d.carga * d.nota
  			}
  		// if(coefTrancamento != coefTrancamento)
  		// 	coefTrancamento = 0
  		if(!B1)
  			B1 = 1
  	}
  	coefTrancamento = 1.0 - (CT/(2.0*C))

  	return coefTrancamento*(A1/B1)
  }

}
