var reservations = [];
var activeReservation = 0;

var app = angular.module('browseDataApp', []);

app.controller('browseDataCtrl', function($scope, $http){
    $scope.get_records = function() {
        $http({
            //Send request to the server
            method: 'get', 
            url: restaurantUrl + "/get-records"
        }).then(function(response){
            //Successfully connected to the server
            if(response.data.msg === "SUCCESS") {
                reservations = response.data.data;
                $scope.obj = reservations[activeReservation];
                $scope.showHide();
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error)
        }
    }

    //execute on page load
    $scope.get_records()

    $scope.changeReservation = function(direction) {
        activeReservation += direction;
        $scope.obj = reservations[activeReservation];
        $scope.showHide();
    }

    //hide buttons if on first/last spells
    $scope.showHide = function() {
        $scope.hidePrev = (activeReservation == 0);
        $scope.hideNext = (activeReservation == reservations.length - 1);
    }
}); //End of controller