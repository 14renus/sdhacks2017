var app = angular.module("myApp", ['ngRoute',]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[%');
    $interpolateProvider.endSymbol('%]');
});

/*app.config(['$routeProvider',
     function($routeProvider) {
         $routeProvider.
             when('/', {
                 templateUrl: '/static/partials/index.html',
             }).
             when('/about', {
                 templateUrl: '../static/partials/about.html',
             }).
             otherwise({
                 redirectTo: '/'
             });
    }]);*/

app.controller("patientCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.patient = {
        height: {ft:"", in:""},
        weight: "",
        gender: "",
        shot_count: 0,
        score: 8
    };

    var root = "http://127.0.0.1:5000";
    $scope.test="hello";

    function getData() {
        console.log('ello');
        /*$http({
          method: 'GET',
          url: '/get_json_test'
        }).then(function successCallback(response) {
             $scope.test=response
          }, function errorCallback(response) {
            $scope.test='error'
          });*/
          console.log(root + "/get_json_test");
          $http.post(root + "/submit")
            .then(function(response) {
                console.log('zzz');
                console.log(response);
            });

        //$scope.test="do not printt";
    }

    $scope.submit = function(score){
        console.log('submit1');
        if($scope.patient.weight=="")
            return;
        if($scope.patient.gender=="")
            return;
        if(score==8)
            return;
        $scope.patient.score=score;
        console.log($scope.patient.weight);
        console.log($scope.patient.gender);
        console.log($scope.patient.score);

        /*$http.post(root + "/submit")
            .then(function(response) {
                console.log('zzz');
                console.log(response);
            });*/
    }

    $scope.addShot = function() {
        $scope.patient.shot_count += 1;
    }

}]);
