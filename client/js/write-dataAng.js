var app = angular.module('writeDataApp', []);

//POST - function to add a reservation
app.controller("writeDataCtrl", function($scope, $http){
    $scope.submit = function(){
        //make sure user does not submit blank form
        if($scope.name === "" || $scope.date === "" || $scope.time === "" || $scope.guests === "" || $scope.phone === "" || $scope.email === "") {
            $scope.addResults = "Please fill out all fields";
            return;
        }

        $http({
            method: 'post',
            url: restaurantUrl + "/write-record",
            data: {
                id: $scope.id,
                name: $scope.name,
                date: $scope.date,
                time: $scope.time,
                guests: $scope.guests,
                requests: $scope.requests,
                phone: $scope.phone,
                email: $scope.email
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS") {
                $scope.addResults = "Reservation is added!";
                $scope.name = "";
                $scope.date = "";
                $scope.time = "";
                $scope.guests = "";
                $scope.requests = "";
                $scope.phone = "";
                $scope.email = "";
            }else {
                $scope.addResults = response.data.msg
            }
        }), function(error) {
            console.log(error);
        }
    } //end of write record function

    $scope.addResults = "";

    //clear entire form
    $scope.clear = function() {
        document.getElementById("reservation").reset();
    }

});