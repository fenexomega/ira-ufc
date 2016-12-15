angular.module('mainApp').controller('iraController',['$scope', '$http', iraController]);

function iraController($scope, $http)
{
  $scope.disciplinas = [{
       "nome":"Fundamentos de Programação",
       "nota":10,
       "carga":96,
       "semestre":1,
       "trancada":false
    },
    {
         "nome":"Fundamentos de Programação",
         "nota":10,
         "carga":96,
         "semestre":1,
         "trancada":false
      },
      {
           "nome":"Fundamentos de Programação",
           "nota":10,
           "carga":96,
           "semestre":1,
           "trancada":false
        }];
}
