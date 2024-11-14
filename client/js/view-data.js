//client side for retrieving reservation data
function getReservations() {
    $.ajax({
        url: restaurantUrl + "/get-records",
        type: "get",
        success: function(response) {
            responseData = JSON.parse(response);  //1. parse response variable
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

//ajax functions to Delete data
function deleteReservation() {
    $.ajax({
        url: restaurantUrl + "/get-records",
        type: "get",
        success: function(response) {
            responseData = JSON.parse(response);  //1. parse response variable
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

getReservations();   //populate table on load