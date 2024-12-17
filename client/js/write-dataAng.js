var app = angular.module('writeDataApp', []);

app.controller("writeDataCtrl", function($scope, $http){
    //Initialize reservation object
    $scope.reservation = {
        id: "",
        name: "",
        date: "",
        time: "",
        guests: "",
        requests: "",
        phone: "",
        email: ""
    }

    $scope.addResults = "";
    
    //POST - function to submit a new reservation (write-record)
    $scope.submit = function(){
        //Validation check. Make sure user does not submit blank form
        if(!$scope.reservation.name || 
            !$scope.reservation.date || 
            !$scope.reservation.time || 
            !$scope.reservation.guests || 
            !$scope.reservation.phone || 
            !$scope.reservation.email
        ) {
            $scope.addResults = "Please fill out all required fields";
            return;
        }

        $http({
            method: 'post',
            url: restaurantUrl + "/write-record",
            data: $scope.reservation,
        }).then(function(response){
            if(response.data.msg === "SUCCESS") {
                $scope.addResults = "Reservation is added!";
                
                //clear form after submission
                $scope.clear();
            }else {
                $scope.addResults = response.data.msg
            }
        }), function(error) {
            console.log(error);
        }
    } //end of submit (write-record) function

    //clear entire form
    $scope.clear = function() {
        $scope.reservation = {
            id: "",
            name: "",
            date: "",
            time: "",
            guests: "",
            requests: "",
            phone: "",
            email: ""
        }
    }
});