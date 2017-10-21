var app = angular.module("myApp", []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
});

app.controller("patientCtrl", ['$scope', function($scope) {
    $scope.patient = {
    	height: {ft:"", in:""},
    	weight: "",
    	gender: ""
    }

    $scope.test="hello"

    $scope.submit = function(){
    	
    	$scope.test="submitted"
        console.log($scope.test);
    }

    
}]);