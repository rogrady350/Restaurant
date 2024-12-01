//submit form
$("#submit").click(function() {
    var name = $('#name').val();
    var date = $('#date').val();
    var time = $('#time').val();
    var guests = $('#guests').val();
    var requests = $('#requests').val();
    var phone = $('#phone').val();
    var email = $('#email').val();

    var jsonString = {
        name:name, 
        date:date,
        time:time,
        guests:guests,
        requests:requests,
        phone:phone,
        email:email
    };

    //client side post to add data
    $.ajax({
        url: restaurantUrl + "/write-record",
        type: "post",
        data: jsonString,
        success: function(response) {
            var data = JSON.parse(response);
            if(data.msg = "SUCCESS") {
                alert("Data Saved");
            } else {
                console.log(data.msg);
            }
        },
        error: function(err){
            console.log(err);
        }
    })
    return false;
});

//clear entire form
$("#clear").click(function() {
    $("#reservation")[0].reset();
});