//json object for data records
var reservationData = `[{"ID":1,"name":"OGrady","date":"10/03/24","time":"6:30","requests":"none","number":"7329561842","email":"rog@gmail.com"},
                        {"ID":2,"name":"Ciancia","date":"10/03/24","time":"5:30","requests":"table by window","number":"7329561842","email":"lci@gmail.com"},
                        {"ID":3,"name":"Diaz","date":"10/03/24","time":"6:00","requests":"none","number":"7329561842","email":"adi@gmail.com"},
                        {"ID":4,"name":"Cohen","date":"10/03/24","time":"7:30","requests":"none","number":"7329561842","email":"jco@gmail.com"},
                        {"ID":5,"name":"Sandfort","date":"10/03/24","time":"8:42","requests":"food alergy: gluten","number":"7329561842","email":"tsa@gmail.com"}]`;

//JSON object to hold data
reservationTable = JSON.parse(reservationData);

//populate table
function showTable() {
    var htmlString = ""; //empty string

    for(var i=0; i<reservationTable.length; i++) {
        htmlString += "<tr>";
            htmlString += "<td>" + reservationTable[i].ID + "</td>";
            htmlString += "<td>" + reservationTable[i].name + "</td>";
            htmlString += "<td>" + reservationTable[i].date + "</td>";
            htmlString += "<td>" + reservationTable[i].time + "</td>";
            htmlString += "<td>" + reservationTable[i].requests + "</td>";
            htmlString += "<td>" + reservationTable[i].number + "</td>";
            htmlString += "<td>" + reservationTable[i].email + "</td>";
        htmlString += "</tr>";
    }

    $("#reservationTable").html(htmlString);
}

showTable();   //populate table on load