var app = angular.module("myApp", []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
});

app.controller("patientCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.patient = {
        height: {ft:"", in:""},
        weight: "",
        gender: ""
    };

    var root = "http://127.0.0.1:5000/";
    $scope.test="hello";

    function getData(){
        console.log('ello');
        $scope.test="JO";

        /*$http({
          method: 'GET',
          url: '/get_json_test'
        }).then(function successCallback(response) {
             $scope.test=response
          }, function errorCallback(response) {
            $scope.test='error'
          });*/
          console.log(root + "get_json_test");
          $http.get(root + "get_json_test")
            .then(function(response) {
            $scope.test = response.data;
            });

        //$scope.test="do not printt";
    }

    $scope.submit = function(){
        
        $scope.test="SSSSSSSubmitted";
        getData();
        console.log($scope.test);
    }

}]);
