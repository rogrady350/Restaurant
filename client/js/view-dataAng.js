var reservations = [];

var app = angular.module('viewDataApp', []);

app.controller('viewDataCtrl', function($scope, $http){
    //function to get reservations from db
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
    }; //End of get records function

    //execute on page load
    $scope.get_records();

    $scope.redrawTable = function() {
        var type = $scope.selectedType.value;
        
        $http({
            method: 'get',
            url: restaurantUrl + "/get-reservationByDate",
            params: {date: date}
        }).then(function(response){
            if (response.data.msg === "SUCCESS") {
                $scope.spells = response.data.reservations;
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error);
        }
    }

    $scope.editSpell = function(reservationNumber) {
        $scope.id = $scope.spells[reservationNumber]._id;
        $scope.name = $scope.spells[reservationNumber].name;
        $scope.date = $scope.spells[reservationNumber].date;
        $scope.time = $scope.spells[reservationNumber][time];
        $scope.guests = $scope.spells[reservationNumber][guests];
        $scope.requests = $scope.spells[reservationNumber][requests];
        $scope.phone = $scope.spells[reservationNumber][phone];
        $scope.email = $scope.spells[reservationNumber][email];

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.cancelUpdate = function(){
        $scope.hideTable = false;
        $scope.hideForm = true;
    }

    //update reservation function
    $scope.updateSpell = function() {
        if($scope.name === "" || $scope.date === "" || $scope.time === "" || $scope.guests === "" || $scope.phone === "" || $scope.email === "") {
            $scope.addResults = "Please fill out all fields";
            return;
        }

        $http({
            method: 'put',
            url: potterURL + "/update-spell",
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
                $scope.type = "";
                $scope.effect = "";
                $scope.counter = "";
            }else {
                $scope.addResults = response.data.msg
            }
        }), function(error) {
            console.log(error);
        }
    }

    //function to delete reservation from db
    $scope.deleteReservation = function(_id) {
        console.log(_id);

        $http({
            method: 'delete',
            url: restaurantUrl + "/delete-record",
            params: { _id: id}

        }).then(function(response){
            if(response.data.msg == "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(response.data.msg);
            }
        }), function(error){
            console.log(error);
        }
    }; //end of delete record function

}); //End of controller