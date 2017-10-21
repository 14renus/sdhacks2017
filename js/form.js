var app = angular.module("myApp", []);

app.controller("formCtrl", ['$scope', function($scope) {
    $scope.patient = {
    	height: "",
    	weight: "",
    	gender: ""
    }
}]);