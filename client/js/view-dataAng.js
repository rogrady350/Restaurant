var reservations = [];

var app = angular.module('viewDataApp', []);

app.controller('viewDataCtrl', function($scope, $http){
    //GET - function to retrieve all reservations from db
    $scope.get_records = function() {
        $http({
            //Send request to the server
            method: 'get', 
            url: restaurantUrl + "/get-records"
        }).then(function(response){
            //Successfully connected to the server
            if(response.data.msg === "SUCCESS") {
                reservations = response.data.reservations;
                $scope.reservations = reservations;
                $scope.dates = getDates(reservations);
                $scope.selectedDate = $scope.dates[0];
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error)
        }
    }; //End of get records function

    //execute on page load
    $scope.get_records();

    //GET (by type) - reload table with only reservations from a specific date (needs to be fixed)
    $scope.redrawTable = function() {
        var date = $scope.selectedDate.value;
        
        $http({
            method: 'get',
            url: restaurantUrl + "/get-reservationByDate",
            params: {date: date}
        }).then(function(response){
            if (response.data.msg === "SUCCESS") {
                $scope.reservations = response.data.reservations;
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error);
        }
    }

     //edit reservation function - prepares edit by displaying reservation details in a form
     $scope.editReservation = function(reservationNumber) {
        $scope.id = $scope.reservations[reservationNumber]._id;
        $scope.name = $scope.reservations[reservationNumber].name;
        $scope.date = $scope.reservations[reservationNumber].date;
        $scope.time = $scope.reservations[reservationNumber].time;
        $scope.guests = $scope.reservations[reservationNumber].guests;
        $scope.requests = $scope.reservations[reservationNumber].requests;
        $scope.phone = $scope.reservations[reservationNumber].phone;
        $scope.email = $scope.reservations[reservationNumber].email;

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    //cancel function - cancels update operation and returns to table view
    $scope.cancelUpdate = function(){
        $scope.hideTable = false;
        $scope.hideForm = true;
    }

    //PUT - function to update reservation db data  (server side not complete)
    $scope.updateReservation = function() {
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
    } //end of update record function

    //DELETE - function to delete reservation from db (reservation delete works, redraw not working so table does not reload)
    $scope.deleteReservation = function(id) {
        console.log(id);

        $http({
            method: 'delete',
            url: restaurantUrl + "/delete-record",
            params: { reservationId: id}

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

//utility function to extract reservations froms pecified date
function getDates(reservationTableData) {
    var dateExists;

    datesArray = [{ value:"", display:"All" }];

    for (var i=0; i<reservationTableData.length; i++) {
        dateExists = datesArray.find(function (element) {
            return element.value === reservationTableData[i].date;
        });

        if (dateExists) {
            continue;
        } else {
            datesArray.push({value: reservationTableData[i].date, display: reservationTableData[i].date})
        }
    }

    return datesArray;
}