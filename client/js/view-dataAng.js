var reservations = [];

var app = angular.module('viewDataApp', []);

app.controller('viewDataCtrl', function($scope, $http){
    $scope.get_records = function() {
        $http({
            //Send request to the server
            method: 'get', 
            url: restaurantUrl + "/get-records"
        }).then(function(response){
            //Successfully connected to the server
            if(response.data.msg === "SUCCESS") {
                reservations = response.data.reservations;
                $scope.obj = reservations;
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error)
        }
    }

    //execute on page load
    $scope.get_records()

}); //End of controller