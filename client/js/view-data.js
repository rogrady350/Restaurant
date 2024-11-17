//client side for retrieving reservation data
function getReservations() {
    $.ajax({
        url: restaurantUrl + "/get-records",
        type: "get",
        success: function(response) {
            var responseData = JSON.parse(response);  //1. parse response variable
            //2. test responseData
            if (responseData.msg == "SUCCESS") {
                showTable(responseData.data); // 3. send to showTable
            } else {
                console.log(responseData.msg); //4. if not, log .msg
            }
        },
        error: function(err) {
            console.log(err);
         }
    });
}

//populate table
function showTable(reservationTable) {
    var htmlString = ""; //empty string

    reservationTable.forEach(data =>  {
        htmlString += "<tr>";
            htmlString += "<td>" + data.id + "</td>";
            htmlString += "<td>" + data.name + "</td>";
            htmlString += "<td>" + data.date + "</td>";
            htmlString += "<td>" + data.time + "</td>";
            htmlString += "<td>" + data.requests + "</td>";
            htmlString += "<td>" + data.phone + "</td>";
            htmlString += "<td>" + data.email + "</td>";
            htmlString += "<td><button class='delete-btn' data-id='" + data.id + "'>Delete</button></td>";   
        htmlString += "</tr>";
    });

    $("#reservationTable").html(htmlString);
}

//listerner for delete button (function runs when delete-btn clicked)
$("#reservationTable").on("click", ".delete-btn", function() {
    var reservationId = $(this).data("id"); //get data-id value
    deleteReservation(reservationId);       //delete row with specified id
});

//ajax functions to Delete data of specified id
function deleteReservation(id) {
    $.ajax({
        url: restaurantUrl + "/delete-record",
        type: "delete",
        data: { id }, //send specified id to server (as JSON object)
        success: function(response) {
            var responseData = JSON.parse(response);  //parse response variable
            //test responseData
            if (responseData.msg == "SUCCESS") {
                alert("Reservation Deleted");
                getReservations() //repopulate table
            } else {
                console.log(responseData.msg);
            }
        },
        error: function(err) {
            console.log(err);
         }
    });
}

getReservations();   //populate table on load