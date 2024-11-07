//submit form
$("#submit").click(function() {
    alert("Reservation made successfully");
});

//clear entire form
$("#clear").click(function() {
    $("#reservation")[0].reset();
});