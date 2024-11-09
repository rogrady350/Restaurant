/*json object for data records
var reservationData = `[{"ID":1,"name":"OGrady","date":"10/03/24","time":"6:30","requests":"none","number":"7329561842","email":"rog@gmail.com"},
                        {"ID":2,"name":"Ciancia","date":"10/03/24","time":"5:30","requests":"table by window","number":"7329561842","email":"lci@gmail.com"},
                        {"ID":3,"name":"Diaz","date":"10/03/24","time":"6:00","requests":"none","number":"7329561842","email":"adi@gmail.com"},
                        {"ID":4,"name":"Cohen","date":"10/03/24","time":"7:30","requests":"none","number":"7329561842","email":"jco@gmail.com"},
                        {"ID":5,"name":"Sandfort","date":"10/03/24","time":"8:42","requests":"food alergy: gluten","number":"7329561842","email":"tsa@gmail.com"}]`;

//JSON object to hold data
reservationTable = JSON.parse(reservationData);*/

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
            htmlString += "<td>" + data.ID + "</td>";
            htmlString += "<td>" + data.name + "</td>";
            htmlString += "<td>" + data.date + "</td>";
            htmlString += "<td>" + data.time + "</td>";
            htmlString += "<td>" + data.requests + "</td>";
            htmlString += "<td>" + data.number + "</td>";
            htmlString += "<td>" + data.email + "</td>";
        htmlString += "</tr>";
    });

    $("#reservationTable").html(htmlString);
}

showTable();   //populate table on load