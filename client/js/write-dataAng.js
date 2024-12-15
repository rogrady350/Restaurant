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
            method: 'put',
            url: restaurantUrl + "/update-records",
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
                $scope.cancelUpdate();
                $scope.redrawTable();

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
    

});